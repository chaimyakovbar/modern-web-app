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
  IconButton,
  Button,
  Box,
  Typography,
  Checkbox,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import {
  PlayArrow,
  Refresh,
  CheckCircle,
  Error,
  Schedule,
  Stop,
  Delete,
  SelectAll,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import cicdApi from "../../api/cicdApi";

// Available statuses
const STATUSES = {
  PENDING: "pending",
  RUNNING: "running",
  SUCCESS: "success",
  FAILED: "failed",
  CANCELLED: "cancelled",
};

// Sample data - each product with separate ID and status
const initialProducts = [
  {
    id: 1,
    productName: "Web Application",
    runId: 1,
    runName: "Web Application Run",
    cicdType: "CI/CD",
    subModule: "No",
    agentType: "Agent",
    status: STATUSES.SUCCESS,
    startTime: "2024-01-15 10:30:00",
    duration: "2d 34m",
  },
  {
    id: 2,
    productName: "API Service",
    runId: 1,
    runName: "Web Application Run",
    cicdType: "CI/CD",
    subModule: "No",
    agentType: "Agent",
    status: STATUSES.SUCCESS,
    startTime: "2024-01-15 10:32:00",
    duration: "1d 45m",
  },
  {
    id: 3,
    productName: "Mobile App",
    runId: 2,
    runName: "Mobile App Run",
    cicdType: "CI Only",
    subModule: "Yes",
    agentType: "Poller",
    status: STATUSES.RUNNING,
    startTime: "2024-01-15 11:45:00",
    duration: "1d 12m",
  },
  {
    id: 4,
    productName: "Authentication Service",
    runId: 2,
    runName: "Mobile App Run",
    cicdType: "CI Only",
    subModule: "Yes",
    agentType: "Poller",
    status: STATUSES.PENDING,
    startTime: "2024-01-15 11:47:00",
    duration: "0d 0m",
  },
  {
    id: 5,
    productName: "Database",
    runId: 3,
    runName: "Database Run",
    cicdType: "CD Only",
    subModule: "No",
    agentType: "Agent",
    status: STATUSES.FAILED,
    startTime: "2024-01-15 09:15:00",
    duration: "4d 56m",
  },
  {
    id: 6,
    productName: "Microservice A",
    runId: 3,
    runName: "Database Run",
    cicdType: "CD Only",
    subModule: "No",
    agentType: "Agent",
    status: STATUSES.CANCELLED,
    startTime: "2024-01-15 09:17:00",
    duration: "0d 5m",
  },
];

function TrackingTable({ newRun, statusUpdates }) {
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

  // Update statuses from backend
  useEffect(() => {
    if (statusUpdates && statusUpdates.length > 0) {
      console.log("Updating product statuses from backend:", statusUpdates);

      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          // Find status for current product - support for different fields
          const statusUpdate = statusUpdates.find(
            (status) =>
              status.name === product.productName ||
              status.productName === product.productName ||
              status.product === product.productName ||
              status.id === product.id
          );

          if (statusUpdate) {
            // Update the status - support for different field names
            const newStatus =
              statusUpdate.status ||
              statusUpdate.statusValue ||
              statusUpdate.state ||
              product.status;

            // Convert status to our format if needed
            let normalizedStatus = newStatus.toLowerCase();
            if (
              normalizedStatus === "completed" ||
              normalizedStatus === "done"
            ) {
              normalizedStatus = STATUSES.SUCCESS;
            } else if (
              normalizedStatus === "failed" ||
              normalizedStatus === "error"
            ) {
              normalizedStatus = STATUSES.FAILED;
            } else if (
              normalizedStatus === "running" ||
              normalizedStatus === "in_progress"
            ) {
              normalizedStatus = STATUSES.RUNNING;
            } else if (
              normalizedStatus === "cancelled" ||
              normalizedStatus === "stopped"
            ) {
              normalizedStatus = STATUSES.CANCELLED;
            } else if (
              normalizedStatus === "pending" ||
              normalizedStatus === "waiting"
            ) {
              normalizedStatus = STATUSES.PENDING;
            }

            const updatedProduct = {
              ...product,
              status: normalizedStatus,
            };

            // If there is duration or startTime, update them
            if (statusUpdate.duration) {
              updatedProduct.duration = statusUpdate.duration;
            }
            if (statusUpdate.startTime) {
              updatedProduct.startTime = statusUpdate.startTime;
            }

            return updatedProduct;
          }

          return product;
        });
      });
    }
  }, [statusUpdates]);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case STATUSES.SUCCESS:
        return "success";
      case STATUSES.FAILED:
        return "error";
      case STATUSES.RUNNING:
        return "default";
      case STATUSES.CANCELLED:
        return "warning";
      default:
        return "default";
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case STATUSES.SUCCESS:
        return <CheckCircle />;
      case STATUSES.FAILED:
        return <Error />;
      case STATUSES.RUNNING:
        return <PlayArrow />;
      case STATUSES.CANCELLED:
        return <Stop />;
      default:
        return <Schedule />;
    }
  };

  // Function to rerun a single product
  const handleRerunSingle = (productId) => {
    setConfirmDialog({ open: true, type: "single", productId });
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
      cicdApi.sendRunRequest({
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
      });
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

  // Get overall status of run
  const getRunOverallStatus = (runProducts) => {
    if (runProducts.some((p) => p.status === STATUSES.RUNNING))
      return STATUSES.RUNNING;
    if (runProducts.some((p) => p.status === STATUSES.FAILED))
      return STATUSES.FAILED;
    if (runProducts.every((p) => p.status === STATUSES.SUCCESS))
      return STATUSES.SUCCESS;
    if (runProducts.every((p) => p.status === STATUSES.CANCELLED))
      return STATUSES.CANCELLED;
    return STATUSES.PENDING;
  };

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
      cicdApi.sendRunRequest({
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
      });
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

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header Section - Improved Design */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          pb: 2,
          borderBottom: "2px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #111111 0%, #000000 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Runs Tracking Table
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRerunSelected}
            disabled={selectedProducts.length === 0}
            sx={{
              transition: "all 0.25s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              },
              "&.Mui-disabled": {
                opacity: 0.5,
              },
            }}
          >
            Rerun Selected ({selectedProducts.length})
          </Button>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={handleRerunAll}
            color="primary"
            sx={{
              background: "linear-gradient(135deg, #111111 0%, #000000 100%)",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
              transition: "all 0.25s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
                background: "linear-gradient(135deg, #000000 0%, #111111 100%)",
              },
            }}
          >
            Rerun All
          </Button>
        </Box>
      </Box>

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
            {getUniqueRuns().map((run) => {
              const isExpanded = expandedRuns.has(run.runId);
              const overallStatus = getRunOverallStatus(run.products);

              return (
                <React.Fragment key={run.runId}>
                  {/* Spacing between blocks */}
                  <TableRow
                    sx={{
                      height: "12px",
                      "& td": { padding: 0, border: "none" },
                    }}
                  >
                    <TableCell
                      colSpan={8}
                      sx={{
                        height: "12px",
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)",
                      }}
                    />
                  </TableRow>
                  {/* Main run row */}
                  <TableRow
                    sx={{
                      backgroundColor: isExpanded
                        ? "rgba(0, 0, 0, 0.08)"
                        : "transparent",
                      transition: "all 0.25s ease-in-out",
                      borderTop: "2px solid",
                      borderTopColor: "primary.main",
                      borderBottom: "1px solid",
                      borderBottomColor: "divider",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.12)",
                        transform: "scale(1.001)",
                      },
                      "& td": {
                        py: 2,
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={run.products.every((p) =>
                          selectedProducts.includes(p.id)
                        )}
                        indeterminate={
                          run.products.some((p) =>
                            selectedProducts.includes(p.id)
                          ) &&
                          !run.products.every((p) =>
                            selectedProducts.includes(p.id)
                          )
                        }
                        sx={{
                          transition: "all 0.25s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                        onChange={() => {
                          if (
                            run.products.every((p) =>
                              selectedProducts.includes(p.id)
                            )
                          ) {
                            // Remove all products of the run
                            setSelectedProducts((prev) =>
                              prev.filter(
                                (id) => !run.products.some((p) => p.id === id)
                              )
                            );
                          } else {
                            // Add all products of the run
                            setSelectedProducts((prev) => [
                              ...prev.filter(
                                (id) => !run.products.some((p) => p.id === id)
                              ),
                              ...run.products.map((p) => p.id),
                            ]);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => toggleRunExpansion(run.runId)}
                          sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            color: "primary.main",
                            transition: "all 0.25s ease-in-out",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.2)",
                              transform: "rotate(180deg)",
                            },
                          }}
                        >
                          {isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                        <Typography variant="body2" fontWeight={700}>
                          Run
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{ mb: 0.5 }}
                      >
                        {run.runName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.15)",
                            color: "primary.light",
                            fontSize: "0.7rem",
                          }}
                        >
                          {run.cicdType}
                        </Box>
                        <Box component="span">•</Box>
                        <Box component="span">{run.subModule}</Box>
                        <Box component="span">•</Box>
                        <Box component="span">{run.agentType}</Box>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontFamily: "monospace",
                          fontSize: "0.875rem",
                        }}
                      >
                        {run.runId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(overallStatus)}
                        label={overallStatus.toUpperCase()}
                        color={getStatusColor(overallStatus)}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          height: 28,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                          "& .MuiChip-icon": {
                            fontSize: "1rem",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {run.startTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{
                          fontFamily: "monospace",
                          color: "text.primary",
                        }}
                      >
                        {run.products.reduce((total, p) => {
                          const duration = p.duration.match(/(\d+)d\s*(\d+)m/);
                          if (duration) {
                            return (
                              total +
                              parseInt(duration[1]) * 60 +
                              parseInt(duration[2])
                            );
                          }
                          return total;
                        }, 0)}
                        d
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="Rerun entire run" arrow placement="top">
                          <IconButton
                            size="small"
                            onClick={() => handleRerunEntireRun(run.runId)}
                            sx={{
                              color: "primary.main",
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              transition: "all 0.25s ease-in-out",
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                transform: "scale(1.1)",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                              },
                            }}
                          >
                            <PlayArrow fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="Delete entire run"
                          arrow
                          placement="top"
                        >
                          <IconButton
                            size="small"
                            onClick={() => {
                              run.products.forEach((p) =>
                                handleDeleteProduct(p.id)
                              );
                            }}
                            sx={{
                              color: "error.main",
                              backgroundColor: "rgba(239, 68, 68, 0.1)",
                              transition: "all 0.25s ease-in-out",
                              "&:hover": {
                                backgroundColor: "rgba(239, 68, 68, 0.2)",
                                transform: "scale(1.1)",
                                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                              },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>

                  {/* Products of the run */}
                  {isExpanded &&
                    run.products.map((product, index) => {
                      const getStatusStyles = (status) => {
                        switch (status) {
                          case STATUSES.SUCCESS:
                            return {
                              bg: "rgba(34, 197, 94, 0.08)",
                              hoverBg: "rgba(34, 197, 94, 0.15)",
                              borderColor: "success.main",
                              chipColor: "success",
                            };
                          case STATUSES.FAILED:
                            return {
                              bg: "rgba(239, 68, 68, 0.08)",
                              hoverBg: "rgba(239, 68, 68, 0.15)",
                              borderColor: "error.main",
                              chipColor: "error",
                            };
                          case STATUSES.RUNNING:
                            return {
                              bg: "rgba(107, 114, 128, 0.08)",
                              hoverBg: "rgba(107, 114, 128, 0.15)",
                              borderColor: "#6B7280",
                              chipColor: "default",
                            };
                          case STATUSES.CANCELLED:
                            return {
                              bg: "rgba(245, 158, 11, 0.08)",
                              hoverBg: "rgba(245, 158, 11, 0.15)",
                              borderColor: "warning.main",
                              chipColor: "warning",
                            };
                          default:
                            return {
                              bg:
                                index % 2 === 0
                                  ? "rgba(0, 0, 0, 0.05)"
                                  : "transparent",
                              hoverBg: "rgba(0, 0, 0, 0.12)",
                              borderColor: "divider",
                              chipColor: "default",
                            };
                        }
                      };

                      const statusStyles = getStatusStyles(product.status);

                      return (
                        <TableRow
                          key={product.id}
                          selected={selectedProducts.includes(product.id)}
                          sx={{
                            backgroundColor: statusStyles.bg,
                            transition: "all 0.25s ease-in-out",
                            borderTop: index === 0 ? "1px solid" : "none",
                            borderTopColor:
                              index === 0 ? "divider" : "transparent",
                            borderBottom:
                              index === run.products.length - 1
                                ? "2px solid"
                                : "1px solid",
                            borderBottomColor:
                              index === run.products.length - 1
                                ? "primary.main"
                                : "divider",
                            "&:hover": {
                              backgroundColor: statusStyles.hoverBg,
                              transform: "translateX(-2px)",
                            },
                            "& td": {
                              paddingLeft: 6,
                              borderLeft: "4px solid",
                              borderLeftColor: statusStyles.borderColor,
                              py: 1.5,
                            },
                            "&.Mui-selected": {
                              backgroundColor: "rgba(0, 0, 0, 0.2)",
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.25)",
                              },
                            },
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleSelectProduct(product.id)}
                              sx={{
                                transition: "all 0.25s ease-in-out",
                                "&:hover": {
                                  transform: "scale(1.1)",
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontSize: "0.75rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Product
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight={600}
                              sx={{ color: "text.primary" }}
                            >
                              {product.productName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontFamily: "monospace",
                                fontSize: "0.875rem",
                              }}
                            >
                              {product.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(product.status)}
                              label={product.status.toUpperCase()}
                              color={statusStyles.chipColor}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                fontSize: "0.75rem",
                                height: 28,
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                                "& .MuiChip-icon": {
                                  fontSize: "1rem",
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {product.startTime}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              sx={{
                                fontFamily: "monospace",
                                color: "text.primary",
                              }}
                            >
                              {product.duration}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 0.5 }}>
                              <Tooltip title="Rerun" arrow placement="top">
                                <IconButton
                                  size="small"
                                  onClick={() => handleRerunSingle(product.id)}
                                  sx={{
                                    color: "primary.main",
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    transition: "all 0.25s ease-in-out",
                                    "&:hover": {
                                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                                      transform: "scale(1.1)",
                                      boxShadow:
                                        "0 4px 12px rgba(0, 0, 0, 0.3)",
                                    },
                                  }}
                                >
                                  <PlayArrow fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete" arrow placement="top">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleDeleteProduct(product.id)
                                  }
                                  sx={{
                                    color: "error.main",
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    transition: "all 0.25s ease-in-out",
                                    "&:hover": {
                                      backgroundColor: "rgba(239, 68, 68, 0.2)",
                                      transform: "scale(1.1)",
                                      boxShadow:
                                        "0 4px 12px rgba(239, 68, 68, 0.3)",
                                    },
                                  }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </React.Fragment>
              );
            })}
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

      {/* Confirm rerun dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() =>
          setConfirmDialog({ open: false, type: "", productId: null })
        }
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: "background.paper",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "1.25rem",
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 2,
          }}
        >
          Confirm Rerun
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1">
            {confirmDialog.type === "single" &&
              "Are you sure you want to rerun this product?"}
            {confirmDialog.type === "multiple" &&
              `Are you sure you want to rerun the ${selectedProducts.length} selected products?`}
            {confirmDialog.type === "all" &&
              "Are you sure you want to rerun all products?"}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button
            onClick={() =>
              setConfirmDialog({ open: false, type: "", productId: null })
            }
            sx={{
              transition: "all 0.25s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmRerun}
            variant="contained"
            color="primary"
            sx={{
              background: "linear-gradient(135deg, #111111 0%, #000000 100%)",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
              transition: "all 0.25s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
                background: "linear-gradient(135deg, #000000 0%, #111111 100%)",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TrackingTable;
