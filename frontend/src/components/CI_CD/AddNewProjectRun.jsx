import {
  Button,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Box,
  IconButton,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import { Close, ArrowBack } from "@mui/icons-material";
import React, { useState } from "react";
import { PROJECTS } from "../consts/Sensors";

function AddNewProjectRun({ onNewRun, onBack, onClose }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cicdType, setCicdType] = useState("cicd");
  const [subModule, setSubModule] = useState("no");
  const [agentType, setAgentType] = useState("agent");
  const [filterType, setFilterType] = useState("all");
  const [devEnvironmentType, setDevEnvironmentType] = useState("dev");
  const [baseImageType, setBaseImageType] = useState("default_image");
  const [baseImageText, setBaseImageText] = useState("");
  const [agentText, setAgentText] = useState("");
  const [pollerText, setPollerText] = useState("");
  const [branchText, setBranchText] = useState("");
  const handleProductToggle = (product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleSubmit = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product");
      return;
    }

    const isBase = baseImageType === "base_image";
    const isAgent = agentType === "agent";
    const isPoller = agentType === "poller";
    const isBoth = agentType === "agent + poller";

    const agentTextOut =
      isBase && (isAgent || isBoth) ? (isBoth ? agentText : baseImageText) : "";
    const pollerTextOut =
      isBase && (isPoller || isBoth)
        ? isBoth
          ? pollerText
          : baseImageText
        : "";
    const baseImageTextOut = "";

    const newRun = {
      id: Date.now(),
      name: selectedProducts[0].name,
      ci: cicdType === "cicd" || cicdType === "ci",
      cd: cicdType === "cicd" || cicdType === "cd",
      subModule: subModule === "yes",
      agent: agentType === "agent" || agentType === "agent + poller",
      poller: agentType === "poller" || agentType === "agent + poller",
      development: devEnvironmentType === "dev",
      integration: devEnvironmentType === "int",
      production: devEnvironmentType === "prod",
      baseImageText: baseImageTextOut,
      agentText: agentTextOut,
      pollerText: pollerTextOut,
      status: "pending",
      startTime: new Date().toLocaleString("en-US"),
      products: selectedProducts.map((p) => p.name),
      branch: selectedProducts.length === 1 ? branchText : "",
    };

    // Detailed console log of all data
    console.log("=== SENSOR RUN DATA ===");
    console.log(
      "Selected Products:",
      selectedProducts.map((p) => ({ id: p.id, name: p.name, type: p.type }))
    );
    console.log("CI:", cicdType === "cicd" || cicdType === "ci");
    console.log("CD:", cicdType === "cicd" || cicdType === "cd");
    console.log("Sub Module:", subModule === "yes");
    console.log(
      "Agent:",
      agentType === "agent" || agentType === "agent + poller"
    );
    console.log(
      "Poller:",
      agentType === "poller" || agentType === "agent + poller"
    );
    console.log("Development:", devEnvironmentType === "dev");
    console.log("Integration:", devEnvironmentType === "int");
    console.log("Production:", devEnvironmentType === "prod");
    // Base Image Type removed from payload per request; skip logging
    console.log("Filter Type:", filterType);
    console.log("Total Selected Products:", selectedProducts.length);
    console.log(
      "Product Names:",
      selectedProducts.map((p) => p.name)
    );
    // console.log("Full Run Object:", newRun);
    console.log("======================");

    // Pass the new run to the parent component
    if (onNewRun) {
      onNewRun(newRun);
    }

    // Reset the form
    setSelectedProducts([]);
    setCicdType("cicd");
    setSubModule("no");
    setAgentType("agent");
    setDevEnvironmentType("dev");
    setBaseImageType("default_image");
    setBaseImageText("");
    setAgentText("");
    setPollerText("");
    setBranchText("");

    onClose();
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilterType(newFilter);
    }
  };

  const handleBaseImageChange = (event) => {
    const newValue = event.target.value;
    setBaseImageType(newValue);

    // Clear text when switching to default
    if (newValue === "default_image") {
      setBaseImageText("");
    }
  };

  const getFilteredProducts = () => {
    if (filterType === "all") {
      return PROJECTS;
    }
    return PROJECTS.filter((product) => product.type === filterType);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={onBack}
          startIcon={<ArrowBack />}
          variant="outlined"
          size="small"
        >
          Back
        </Button>
        <Typography
          variant="h6"
          sx={{ ml: 2, borderBottom: "1px solid", borderColor: "divider" }}
        >
          Products Deploy
        </Typography>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={selectedProducts.length === 0}
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "grey.400 !important",
              color: "white !important",
              opacity: 0.6,
              cursor: "not-allowed",
            },
          }}
        >
          Deploy Selected ({selectedProducts.length})
        </Button>
      </Box>

      <Box style={{ display: "flex" }}>
        <DialogContent sx={{ p: 2 }}>
          <Box sx={{ maxWidth: 900, width: "100%", mx: "auto" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* RIGHT: Settings */}
              <Box sx={{ flex: "0 0 56%", minWidth: 0 }}>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel
                      component="legend"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      CI/CD Type
                    </FormLabel>
                    <RadioGroup
                      value={cicdType}
                      onChange={(e) => setCicdType(e.target.value)}
                      row
                    >
                      <FormControlLabel
                        value="cicd"
                        control={<Radio />}
                        label="CI/CD"
                      />
                      <FormControlLabel
                        value="ci"
                        control={<Radio />}
                        label="CI Only"
                      />
                      <FormControlLabel
                        value="cd"
                        control={<Radio />}
                        label="CD Only"
                      />
                    </RadioGroup>
                  </FormControl>

                  {selectedProducts.length === 1 && (
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                      <FormLabel
                        component="legend"
                        sx={{ mb: 1, fontWeight: "bold" }}
                      >
                        Sub Module
                      </FormLabel>
                      <RadioGroup
                        value={subModule}
                        onChange={(e) => setSubModule(e.target.value)}
                        row
                      >
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                        <FormControlLabel
                          value="updateSubModuletz"
                          control={<Radio />}
                          label="Update Sub Module"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}

                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel
                      component="legend"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Agent Type
                    </FormLabel>
                    <RadioGroup
                      value={agentType}
                      onChange={(e) => setAgentType(e.target.value)}
                      row
                    >
                      <FormControlLabel
                        value="agent"
                        control={<Radio />}
                        label="Agent"
                      />
                      <FormControlLabel
                        value="poller"
                        control={<Radio />}
                        label="Poller"
                      />
                      <FormControlLabel
                        value="agent + poller"
                        control={<Radio />}
                        label="Agent & Poller"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel
                      component="legend"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Environment Type
                    </FormLabel>
                    <RadioGroup
                      value={devEnvironmentType}
                      onChange={(e) => setDevEnvironmentType(e.target.value)}
                      row
                    >
                      <FormControlLabel
                        value="dev"
                        control={<Radio />}
                        label="Development"
                      />
                      <FormControlLabel
                        value="prod"
                        control={<Radio />}
                        label="Production"
                      />
                      <FormControlLabel
                        value="int"
                        control={<Radio />}
                        label="Integration"
                      />
                    </RadioGroup>
                  </FormControl>

                  {selectedProducts.length === 1 && (
                    <>
                      <FormControl component="fieldset" sx={{ mb: 2 }}>
                        <FormLabel
                          component="legend"
                          sx={{ mb: 1, fontWeight: "bold" }}
                        >
                          Base Image Type
                        </FormLabel>
                        <RadioGroup
                          value={baseImageType}
                          onChange={handleBaseImageChange}
                          row
                        >
                          <FormControlLabel
                            value="default_image"
                            control={<Radio />}
                            label="Default Image"
                          />
                          <FormControlLabel
                            value="base_image"
                            control={<Radio />}
                            label="Base Image"
                          />
                        </RadioGroup>
                      </FormControl>

                      {agentType !== "agent + poller" &&
                        baseImageType === "base_image" && (
                          <TextField
                            fullWidth
                            label={`${agentType} Image Details`}
                            value={baseImageText}
                            onChange={(e) => setBaseImageText(e.target.value)}
                            placeholder="Enter base image details..."
                            sx={{ mb: 2 }}
                          />
                        )}
                      {agentType === "agent + poller" &&
                        baseImageType === "base_image" && (
                          <Box sx={{ mb: 2 }}>
                            <TextField
                              fullWidth
                              label="Agent Details"
                              value={agentText}
                              onChange={(e) => setAgentText(e.target.value)}
                              placeholder="Enter agent details..."
                              sx={{ mb: 1 }}
                            />
                            <TextField
                              fullWidth
                              label="Poller Details"
                              value={pollerText}
                              onChange={(e) => setPollerText(e.target.value)}
                              placeholder="Enter poller details..."
                            />
                          </Box>
                        )}
                    </>
                  )}

                  {selectedProducts.length === 1 && (
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                      <FormLabel
                        component="legend"
                        sx={{ mb: 1, fontWeight: "bold" }}
                      >
                        Branch Name
                      </FormLabel>
                      <TextField
                        fullWidth
                        value={branchText}
                        onChange={(e) => setBranchText(e.target.value)}
                        placeholder="Enter branch name..."
                      />
                    </FormControl>
                  )}
                </Box>
              </Box>

              {/* LEFT: Product selection & list */}
              <Box
                sx={{
                  flex: "0 0 44%",
                  minWidth: 0,
                  minHeight: 520,
                  maxHeight: 520,
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontSize: "20px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "170px",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "8px",
                      // p: "0px 10px",
                      textAlign: "center",
                    }}
                  >
                    Selected: {selectedProducts.length} / {PROJECTS.length}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mb: 2,
                      maxHeight: 60,
                      minHeight: 60,
                      overflowY: "auto",
                      pr: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "8px",
                      p: 1,
                    }}
                  >
                    {selectedProducts.map((product) => (
                      <Chip
                        key={product.id}
                        label={product.name}
                        onDelete={() => handleRemoveProduct(product.id)}
                        deleteIcon={<Close />}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Button
                    onClick={() => setSelectedProducts(getFilteredProducts())}
                    variant="contained"
                    color="secondary"
                    sx={{ minWidth: 120 }}
                  >
                    Select All
                  </Button>
                  <Button
                    onClick={() => setSelectedProducts([])}
                    variant="outlined"
                    color="error"
                    sx={{ minWidth: 120 }}
                  >
                    Clear All
                  </Button>
                </Box>

                <Box>
                  {/* Filter Buttons */}
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{ fontWeight: "bold", p: "10px 10px" }}
                    >
                      Filter by Type:
                    </Typography>
                    <ToggleButtonGroup
                      value={filterType}
                      exclusive
                      onChange={handleFilterChange}
                      aria-label="filter by type"
                      size="small"
                      sx={{
                        mb: 1,
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                        "& .MuiToggleButton-root": {
                          borderRadius: "20px",
                          border: "1px solid",
                          borderColor: "divider",
                          px: 2,
                          py: 0.5,
                          textTransform: "none",
                          transition: "all 0.2s ease-in-out",
                          "&.Mui-selected": {
                            backgroundColor: "primary.main",
                            color: "primary.contrastText",
                            borderColor: "primary.main",
                            "&:hover": {
                              backgroundColor: "primary.dark",
                            },
                          },
                          "&:hover": {
                            backgroundColor: "action.hover",
                            borderColor: "primary.main",
                          },
                        },
                      }}
                    >
                      <ToggleButton value="all" aria-label="all">
                        All
                      </ToggleButton>
                      <ToggleButton value="space" aria-label="space">
                        Space
                      </ToggleButton>
                      <ToggleButton value="land" aria-label="land">
                        Land
                      </ToggleButton>
                      <ToggleButton value="sky" aria-label="sky">
                        Sky
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                  <List sx={{ maxHeight: 240, overflow: "auto" }}>
                    {getFilteredProducts().map((product) => {
                      const isSelected = selectedProducts.some(
                        (p) => p.id === product.id
                      );
                      return (
                        <ListItem key={product.id} disablePadding>
                          <ListItemButton
                            onClick={() => handleProductToggle(product)}
                            sx={{
                              borderRadius: "9999px",
                              backgroundColor: isSelected
                                ? "primary.main"
                                : "transparent",
                              border: "1px solid",
                              borderColor: "divider",
                              overflow: "hidden",
                              "&:hover": {
                                backgroundColor: isSelected
                                  ? "primary.light"
                                  : "action.hover",
                              },
                              mb: 0.5,
                              justifyContent: "center",
                              px: 1.5,
                            }}
                          >
                            <ListItemText
                              primary={product.name}
                              sx={{
                                color: isSelected ? "white" : "text.primary",
                                fontWeight: isSelected ? "bold" : "normal",
                                textAlign: "center",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Box>
      <DialogActions>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </>
  );
}

export default AddNewProjectRun;
