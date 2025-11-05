import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  Checkbox,
  Alert,
  Button,
} from "@mui/material";
import { PlayArrow, Refresh } from "@mui/icons-material";
import config from "../../../config/config";
import RunsHeader from "./RunsHeader";
import RunBlock from "./RunBlock";
import ConfirmRerunDialog from "./ConfirmRerunDialog";
import { STATUSES } from "./shared/status";
import { initialProducts } from "./shared/sampleData";

function TrackingTable({ newRun, runs = [], onManualRefresh }) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [expandedRuns, setExpandedRuns] = useState(new Set());
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "",
    productId: null,
  });

  // Add new run when received
  useEffect(() => {
    if (newRun) {
      // Create separate products for each product in the run
      const newProducts = newRun.products.map((productName, index) => ({
        id: Date.now() + index,
        productName: productName,
        runId: newRun.id,
        runName: newRun.name,
        cicdType:
          newRun.cicdType ||
          (newRun.ci && newRun.cd
            ? "CI/CD"
            : newRun.ci
            ? "CI Only"
            : "CD Only"),
        subModule: newRun.subModule === true ? "Yes" : "No",
        agentType:
          newRun.agent && newRun.poller
            ? "Agent & Poller"
            : newRun.agent
            ? "Agent"
            : "Poller",
        status: STATUSES.PENDING,
        startTime: new Date().toLocaleString("en-US"),
        duration: "0d 0m",
      }));
      setProducts((prev) => [...newProducts, ...prev]);
    }
  }, [newRun]);

  // Real-time updates removed (WebSocket). Future: poll or refresh as needed.

  // icon is handled within subcomponents

  // single-product rerun now flows via per-product actions (stop/delete only here)

  // Function to stop a single product
  const handleStopSingle = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Optional: send cancel action to backend (best-effort, ignore errors)
    config.api.http
      .post(config.api.endpoints.cicd.runs, {
        action: "cancel",
        items: [
          {
            id: product.id,
            productName: product.productName,
            runId: product.runId,
            runName: product.runName,
            cicdType: product.cicdType,
            agentType: product.agentType,
            subModule: product.subModule,
            requestedAt: new Date().toISOString(),
            source: "TrackingTable",
          },
        ],
      })
      .catch(() => {});

    // Local status update to CANCELLED
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, status: STATUSES.CANCELLED } : p
      )
    );
  };

  // Function to rerun all selected products
  const handleRerunSelected = () => {
    if (selectedProducts.length === 0) {
      alert("Please select products to rerun");
      return;
    }
    setConfirmDialog({ open: true, type: "multiple", productId: null });
  };

  // Function to rerun all products
  const handleRerunAll = () => {
    setConfirmDialog({ open: true, type: "all", productId: null });
  };

  // Confirm rerun
  const confirmRerun = () => {
    const newProducts = [...products];

    // Helper: build list of targets based on dialog type
    const collectTargets = () => {
      if (confirmDialog.type === "single") {
        const product = newProducts.find(
          (p) => p.id === confirmDialog.productId
        );
        return product ? [product] : [];
      }
      if (confirmDialog.type === "multiple") {
        return newProducts.filter((p) => selectedProducts.includes(p.id));
      }
      if (confirmDialog.type === "all") {
        return [...newProducts];
      }
      return [];
    };

    const targets = collectTargets();
    // Filter out products with SUCCESS (do not send or reset)
    const runnable = targets.filter((p) => p.status !== STATUSES.SUCCESS);

    // Send batch rerun request to backend (skip successes)
    if (runnable.length > 0) {
      const payload = {
        action: "rerun",
        items: runnable.map((p) => ({
          id: p.id,
          productName: p.productName,
          runId: p.runId,
          runName: p.runName,
          cicdType: p.cicdType,
          agentType: p.agentType,
          subModule: p.subModule,
          requestedAt: new Date().toISOString(),
          source: "TrackingTable",
        })),
      };
      console.log("rerun payload (client):", payload);
      config.api.http.post(config.api.endpoints.cicd.runs, payload);
    }

    // Locally reset only non-success items to pending
    runnable.forEach((product) => {
      const idx = newProducts.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        newProducts[idx] = {
          ...newProducts[idx],
          id: Date.now() + Math.random(),
          status: STATUSES.PENDING,
          startTime: new Date().toLocaleString("en-US"),
          duration: "0d 0m",
        };
      }
    });

    setProducts(newProducts);
    setSelectedProducts([]);
    setConfirmDialog({ open: false, type: "", productId: null });
  };

  // Select single product
  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Delete product
  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  };

  // Get list of unique runs
  const getUniqueRuns = () => {
    const runsMap = new Map();
    products.forEach((product) => {
      if (!runsMap.has(product.runId)) {
        runsMap.set(product.runId, {
          runId: product.runId,
          runName: product.runName,
          cicdType: product.cicdType,
          subModule: product.subModule,
          agentType: product.agentType,
          startTime: product.startTime,
          products: [],
        });
      }
      runsMap.get(product.runId).products.push(product);
    });
    return Array.from(runsMap.values());
  };

  // overall status is computed inside RunBlock

  // Open/close run
  const toggleRunExpansion = (runId) => {
    setExpandedRuns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(runId)) {
        newSet.delete(runId);
      } else {
        newSet.add(runId);
      }
      return newSet;
    });
  };

  // Rerun entire run (by runId), skips SUCCESS and sends to backend
  const handleRerunEntireRun = (runId) => {
    const runProducts = products.filter((p) => p.runId === runId);
    const toRerun = runProducts.filter((p) => p.status !== STATUSES.SUCCESS);

    if (toRerun.length > 0) {
      const payload = {
        action: "rerun",
        runId,
        items: toRerun.map((p, index) => ({
          id: p.id,
          productName: p.productName,
          runId: p.runId,
          runName: p.runName,
          cicdType: p.cicdType,
          agentType: p.agentType,
          subModule: p.subModule,
          requestedAt: new Date().toISOString(),
          source: "TrackingTable",
          order: index,
        })),
      };
      console.log("rerun (entire run) payload (client):", payload);
      config.api.http.post(config.api.endpoints.cicd.runs, payload);
    }

    const updated = products.map((p, idx) => {
      if (p.runId === runId && p.status !== STATUSES.SUCCESS) {
        return {
          ...p,
          id: Date.now() + Math.random() + idx,
          status: STATUSES.PENDING,
          startTime: new Date().toLocaleString("en-US"),
          duration: "0d 0m",
        };
      }
      return p;
    });

    setProducts(updated);
  };

  // If runs are provided from CICD (normalized POST result + polling), render the compact runs table
  if (Array.isArray(runs) && runs.length > 0) {
    const statusColor = (status) => {
      const s = String(status || "pending").toLowerCase();
      if (s === "success") return "success";
      if (s === "failed") return "error";
      if (s === "cancelled") return "warning";
      if (s === "running") return "default";
      return "default";
    };

    return (
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            CI/CD Runs
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => onManualRefresh && onManualRefresh()}
            >
              Refresh status
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell>Pinplane ID</TableCell>
                <TableCell>Project URL</TableCell>
                <TableCell>Success</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {runs.map((r) => (
                <TableRow key={`${r.pinplaneId}-${r.projectId}-${r.name}`}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.projectId}</TableCell>
                  <TableCell>{r.pinplaneId}</TableCell>
                  <TableCell>
                    {r.projectUrl ? (
                      <a href={r.projectUrl} target="_blank" rel="noreferrer">
                        {r.projectUrl}
                      </a>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={r.success ? "YES" : "NO"}
                      color={r.success ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{r.message || ""}</TableCell>
                  <TableCell>
                    <Chip
                      label={(r.status || "pending").toUpperCase()}
                      color={statusColor(r.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <RunsHeader
        selectedCount={selectedProducts.length}
        onRerunSelected={handleRerunSelected}
        onRerunAll={handleRerunAll}
      />

      {/* Table Container - Modern Styling */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          backgroundColor: "background.paper",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "background.default",
                "& th": {
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: "text.secondary",
                  borderBottom: "2px solid",
                  borderColor: "divider",
                  py: 2,
                },
              }}
            >
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getUniqueRuns().map((run) => (
              <RunBlock
                key={run.runId}
                run={run}
                isExpanded={expandedRuns.has(run.runId)}
                selectedProducts={selectedProducts}
                onToggleExpand={() => toggleRunExpansion(run.runId)}
                onToggleSelectRun={() => {
                  if (
                    run.products.every((p) => selectedProducts.includes(p.id))
                  ) {
                    setSelectedProducts((prev) =>
                      prev.filter(
                        (id) => !run.products.some((p) => p.id === id)
                      )
                    );
                  } else {
                    setSelectedProducts((prev) => [
                      ...prev.filter(
                        (id) => !run.products.some((p) => p.id === id)
                      ),
                      ...run.products.map((p) => p.id),
                    ]);
                  }
                }}
                onRerunEntireRun={() => handleRerunEntireRun(run.runId)}
                onDeleteEntireRun={() => {
                  run.products.forEach((p) => handleDeleteProduct(p.id));
                }}
                onSelectProduct={handleSelectProduct}
                onStopProduct={handleStopSingle}
                onDeleteProduct={handleDeleteProduct}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {products.length === 0 && (
        <Alert
          severity="info"
          sx={{
            mt: 2,
            borderRadius: 2,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            border: "1px solid",
            borderColor: "primary.main",
            "& .MuiAlert-icon": {
              color: "primary.main",
            },
          }}
        >
          No products to display. Add a new run using the "Add New Run" button.
        </Alert>
      )}

      <ConfirmRerunDialog
        open={confirmDialog.open}
        type={confirmDialog.type}
        selectedCount={selectedProducts.length}
        onClose={() =>
          setConfirmDialog({ open: false, type: "", productId: null })
        }
        onConfirm={confirmRerun}
      />
    </Box>
  );
}

export default TrackingTable;
