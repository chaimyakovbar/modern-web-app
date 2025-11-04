import React, { useState } from "react";
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
import config from "../config/config";

const CICD = ({}) => {
  const [newRun, setNewRun] = useState(null);

  // WebSocket removed – using REST only now

  // Function to handle new run
  const handleNewRun = (run) => {
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
    if (Array.isArray(run.products) && run.products.length === 1) {
      console.log(
        "POST -> singleRun",
        config.api.endpoints.cicd.singleRun,
        singleRun
      );
      config.api.http.post(config.api.endpoints.cicd.singleRun, singleRun);
    } else {
      console.log(
        "POST -> runs",
        config.api.endpoints.cicd.runs,
        serverPayload
      );
      config.api.http.post(config.api.endpoints.cicd.runs, serverPayload);
    }
    // Reset newRun after we passed it
    setTimeout(() => setNewRun(null), 100);
  };

  return (
    <Box>
      <AddNewRun onNewRun={handleNewRun} />

      <TrackingTable newRun={newRun} />
    </Box>
  );
};

export default CICD;
