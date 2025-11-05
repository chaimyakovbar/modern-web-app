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
  Stop,
  Delete,
  PlayArrow,
  CheckCircle,
  Error as ErrorIcon,
  Schedule,
} from "@mui/icons-material";
import { STATUSES } from "./shared/status";

function getStatusIcon(status) {
  switch (status) {
    case STATUSES.SUCCESS:
      return <CheckCircle />;
    case STATUSES.FAILED:
      return <ErrorIcon />;
    case STATUSES.RUNNING:
      return <PlayArrow />;
    case STATUSES.CANCELLED:
      return <Stop />;
    default:
      return <Schedule />;
  }
}

function ProductRow({
  product,
  index,
  isSelected,
  onSelect,
  onStop,
  onDelete,
}) {
  const statusStyles = (() => {
    switch (product.status) {
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
          bg: index % 2 === 0 ? "rgba(0, 0, 0, 0.05)" : "transparent",
          hoverBg: "rgba(0, 0, 0, 0.12)",
          borderColor: "divider",
          chipColor: "default",
        };
    }
  })();

  return (
    <TableRow
      key={product.id}
      selected={isSelected}
      sx={{
        backgroundColor: statusStyles.bg,
        transition: "all 0.25s ease-in-out",
        borderTop: index === 0 ? "1px solid" : "none",
        borderTopColor: index === 0 ? "divider" : "transparent",
        borderBottom: "1px solid",
        borderBottomColor: "divider",
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
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.25)" },
        },
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
          onChange={onSelect}
          sx={{
            transition: "all 0.25s ease-in-out",
            "&:hover": { transform: "scale(1.1)" },
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
          sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
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
            "& .MuiChip-icon": { fontSize: "1rem" },
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
          sx={{ fontFamily: "monospace", color: "text.primary" }}
        >
          {product.duration}
        </Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="Stop" arrow placement="top">
            <IconButton
              size="small"
              onClick={onStop}
              sx={{
                color: "warning.main",
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                transition: "all 0.25s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(245, 158, 11, 0.2)",
                  transform: "scale(1.1)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Stop fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow placement="top">
            <IconButton
              size="small"
              onClick={onDelete}
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
  );
}

export default ProductRow;
