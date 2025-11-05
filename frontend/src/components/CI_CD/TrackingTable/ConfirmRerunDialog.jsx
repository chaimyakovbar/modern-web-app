import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function ConfirmRerunDialog({
  open,
  type,
  selectedCount = 0,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          {type === "single" && "Are you sure you want to rerun this product?"}
          {type === "multiple" &&
            `Are you sure you want to rerun the ${selectedCount} selected products?`}
          {type === "all" && "Are you sure you want to rerun all products?"}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            transition: "all 0.25s ease-in-out",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
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
  );
}

export default ConfirmRerunDialog;
