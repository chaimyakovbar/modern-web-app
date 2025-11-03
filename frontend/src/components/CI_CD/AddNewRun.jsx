import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddNewProjectRun from "./AddNewProjectRun";
import AddNewRunSensor from "./AddNewRunSensor";

const AddNewRun = ({ onNewRun }) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedType(null);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Add New Run
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={selectedType ? "md" : "sm"}
        PaperProps={{
          sx: {
            width: selectedType ? 900 : 480,
            maxWidth: "90vw",
            transition: "width 0.3s ease-in-out",
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: selectedType ? "1px solid" : "none",
            borderColor: "divider",
            pb: selectedType ? 2 : 0,
          }}
        >
          {selectedType ? "Create New Run" : "Choose Run Type"}
        </DialogTitle>
        <DialogContent sx={{ pt: selectedType ? 3 : 2 }}>
          {!selectedType ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                alignItems: "center",
                py: 2,
              }}
            >
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                What type of run would you like to create?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  height: "100px",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => handleTypeSelect("project")}
                  variant="contained"
                  color="primary"
                  size="medium"
                  sx={{
                    minWidth: 140,
                    py: 1.5,
                    px: 3,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    borderRadius: 2,
                  }}
                >
                  Project
                </Button>

                <Button
                  onClick={() => handleTypeSelect("sensor")}
                  variant="contained"
                  sx={{
                    backgroundColor: "#111111",
                    color: "#FFFFFF",
                    minWidth: 140,
                    py: 1.5,
                    px: 3,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#000000",
                    },
                  }}
                  size="medium"
                >
                  Names
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              {selectedType === "project" && (
                <AddNewProjectRun
                  onNewRun={onNewRun}
                  onBack={handleBack}
                  onClose={handleClose}
                />
              )}
              {selectedType === "sensor" && (
                <AddNewRunSensor
                  onNewRun={onNewRun}
                  onBack={handleBack}
                  onClose={handleClose}
                />
              )}
            </Box>
          )}
        </DialogContent>

        {!selectedType && (
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

export default AddNewRun;
