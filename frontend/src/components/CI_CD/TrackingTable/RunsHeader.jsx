import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Refresh, PlayArrow } from "@mui/icons-material";

function RunsHeader({ selectedCount, onRerunSelected, onRerunAll }) {
  return (
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
          onClick={onRerunSelected}
          disabled={selectedCount === 0}
          sx={{
            transition: "all 0.25s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            },
            "&.Mui-disabled": { opacity: 0.5 },
          }}
        >
          Rerun Selected ({selectedCount})
        </Button>
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          onClick={onRerunAll}
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
  );
}

export default RunsHeader;
