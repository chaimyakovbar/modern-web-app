import React from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  Chip,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  PlayArrow,
  Delete,
  ExpandMore,
  ExpandLess,
  CheckCircle,
  Error as ErrorIcon,
  Schedule,
} from "@mui/icons-material";
import ProductRow from "./ProductRow";
import { STATUSES, getStatusColor } from "./shared/status";

function getStatusIcon(status) {
  switch (status) {
    case STATUSES.SUCCESS:
      return <CheckCircle />;
    case STATUSES.FAILED:
      return <ErrorIcon />;
    case STATUSES.RUNNING:
      return <PlayArrow />;
    case STATUSES.CANCELLED:
      return <Schedule />; // no dedicated icon in original for cancelled row icon
    default:
      return <Schedule />;
  }
}

function getRunOverallStatus(products) {
  if (products.some((p) => p.status === STATUSES.RUNNING))
    return STATUSES.RUNNING;
  if (products.some((p) => p.status === STATUSES.FAILED))
    return STATUSES.FAILED;
  if (products.every((p) => p.status === STATUSES.SUCCESS))
    return STATUSES.SUCCESS;
  if (products.every((p) => p.status === STATUSES.CANCELLED))
    return STATUSES.CANCELLED;
  return STATUSES.PENDING;
}

function RunBlock({
  run,
  isExpanded,
  selectedProducts,
  onToggleExpand,
  onToggleSelectRun,
  onRerunEntireRun,
  onDeleteEntireRun,
  onSelectProduct,
  onStopProduct,
  onDeleteProduct,
}) {
  const overallStatus = getRunOverallStatus(run.products);

  const allSelected = run.products.every((p) =>
    selectedProducts.includes(p.id)
  );
  const someSelected =
    run.products.some((p) => selectedProducts.includes(p.id)) && !allSelected;

  const totalDurationMins = run.products.reduce((total, p) => {
    const match = p.duration && p.duration.match(/(\d+)d\s*(\d+)m/);
    if (match) {
      return total + parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
    }
    return total;
  }, 0);

  return (
    <>
      <TableRow sx={{ height: "12px", "& td": { padding: 0, border: "none" } }}>
        <TableCell
          colSpan={8}
          sx={{
            height: "12px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)",
          }}
        />
      </TableRow>

      <TableRow
        sx={{
          backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.08)" : "transparent",
          transition: "all 0.25s ease-in-out",
          borderTop: "2px solid",
          borderTopColor: "primary.main",
          borderBottom: "1px solid",
          borderBottomColor: "divider",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.12)",
            transform: "scale(1.001)",
          },
          "& td": { py: 2 },
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={onToggleSelectRun}
            sx={{
              transition: "all 0.25s ease-in-out",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              size="small"
              onClick={onToggleExpand}
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
          <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
            {run.runName}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
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
            sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
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
              "& .MuiChip-icon": { fontSize: "1rem" },
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
            sx={{ fontFamily: "monospace", color: "text.primary" }}
          >
            {totalDurationMins}d
          </Typography>
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Tooltip title="Rerun entire run" arrow placement="top">
              <IconButton
                size="small"
                onClick={onRerunEntireRun}
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
            <Tooltip title="Delete entire run" arrow placement="top">
              <IconButton
                size="small"
                onClick={onDeleteEntireRun}
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

      {isExpanded &&
        run.products.map((product, index) => (
          <ProductRow
            key={product.id}
            product={product}
            index={index}
            isSelected={selectedProducts.includes(product.id)}
            onSelect={() => onSelectProduct(product.id)}
            onStop={() => onStopProduct(product.id)}
            onDelete={() => onDeleteProduct(product.id)}
          />
        ))}
    </>
  );
}

export default RunBlock;
