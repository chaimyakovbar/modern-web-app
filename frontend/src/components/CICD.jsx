import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
} from "@mui/material";
import {
  Build as BuildIcon,
  CheckCircle,
  Error,
  Schedule,
  PlayArrow,
  Stop,
} from "@mui/icons-material";
import AddNewRun from "./CI_CD/AddNewRun";
import TrackingTable from "./CI_CD/TrackingTable";
// config not required here; API helpers encapsulate base URL
import { runProjects, fetchStatuses } from "../services/cicdApi";

const CICD = () => {
  const [newRun, setNewRun] = useState(null);
  const [runs, setRuns] = useState([]); // normalized rows from initial POST
  const pollingRef = useRef(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, []);

  // WebSocket removed – using REST only now

  // Function to handle new run
  const handleNewRun = async (run) => {
    setNewRun(run);
    // Build server payload: booleans -> 0/1, environment -> 0/1/2
    const singleRun = {
      ci: run.ci ? 1 : 0,
      cd: run.cd ? 1 : 0,
      subModule: run.subModule ? 1 : 0,
      agent: run.agent ? 1 : 0,
      poller: run.poller ? 1 : 0,
      // development = 0, integration = 1, Production = 2
      environment: run.development ? 0 : run.integration ? 1 : 2,
      // keep additional fields if backend needs them
      agentText: run.agentText,
      pollerText: run.pollerText,
      products: run.products,
      branch: run.branch,
      // id: run.id,
      // name: run.name,
      // baseImageText: run.baseImageText,
      // status: run.status,
      // startTime: run.startTime,
    };

    const serverPayload = {
      ci: run.ci ? 1 : 0,
      cd: run.cd ? 1 : 0,
      agent: run.agent ? 1 : 0,
      poller: run.poller ? 1 : 0,
      // development = 0, integration = 1, Production = 2
      environment: run.development ? 0 : run.integration ? 1 : 2,
      products: run.products,
      // baseImageText: run.baseImageText,
      // subModule: run.subModule ? 1 : 0,
      // agentText: run.agentText,
      // pollerText: run.pollerText,
      // branch: run.branch,
    };

    // Send transformed payload to backend via REST (route by products count)
    try {
      let rows = [];
      if (Array.isArray(run.products) && run.products.length === 1) {
        rows = await runProjects(singleRun, true);
      } else {
        rows = await runProjects(serverPayload, false);
      }
      setRuns((prev) => mergeRows(prev, rows));
      startPolling(rows);
    } catch (err) {
      console.error(err);
    }
    // Reset newRun after we passed it
    setTimeout(() => setNewRun(null), 100);
  };

  const makeKey = (r) =>
    `${r.pinplaneId || ""}__${r.projectId || ""}__${r.name || ""}`;

  const mergeRows = (existing, incoming) => {
    const map = new Map(existing.map((r) => [makeKey(r), r]));
    for (const r of incoming) {
      const key = makeKey(r);
      const prev = map.get(key);
      map.set(key, { ...(prev || {}), ...r });
    }
    return Array.from(map.values());
  };

  const buildPinplaneToProjectMap = (rows) => {
    const body = {};
    rows.forEach((r) => {
      // Send only for non-terminal statuses
      if (!isTerminal(r.status)) {
        if (r.pinplaneId && r.projectId) {
          body[r.pinplaneId] = r.projectId;
        }
      }
    });
    return body;
  };

  const isTerminal = (status) =>
    status === "success" || status === "failed" || status === "cancelled";

  const mergeStatuses = (prevRows, statusesObj) => {
    // statusesObj expected: key -> { status, ... }
    return prevRows.map((r) => {
      // Prefer mapping by projectId if present in response; otherwise try name
      const byProject = statusesObj?.[r.projectId];
      const byName = statusesObj?.[r.name];
      const incoming = byProject || byName;
      if (incoming && incoming.status) {
        return { ...r, status: String(incoming.status).toLowerCase() };
      }
      return r;
    });
  };

  const pollOnce = async () => {
    try {
      const body = buildPinplaneToProjectMap(runs);
      if (Object.keys(body).length === 0) return;
      const statuses = await fetchStatuses(body);
      setRuns((prev) => mergeStatuses(prev, statuses));
    } catch (err) {
      console.debug("Polling tick failed", err);
    }
  };

  const startPolling = (initialRows) => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    // immediate first check
    (async () => {
      const body = buildPinplaneToProjectMap(runs.length ? runs : initialRows);
      if (Object.keys(body).length === 0) return;
      try {
        const statuses = await fetchStatuses(body);
        setRuns((prev) => mergeStatuses(prev, statuses));
      } catch (err) {
        console.debug("Initial status fetch failed", err);
      }
    })();

    pollingRef.current = setInterval(() => {
      // stop if all terminal
      const allTerminal = (runs || []).every((r) => isTerminal(r.status));
      if (allTerminal) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
        return;
      }
      pollOnce();
    }, 15000);
  };

  return (
    <Box>
      <AddNewRun onNewRun={handleNewRun} />

      <TrackingTable newRun={newRun} runs={runs} onManualRefresh={pollOnce} />
    </Box>
  );
};

export default CICD;
