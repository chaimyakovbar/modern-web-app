import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import {
  Home as HomeIcon,
  Build as BuildIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Home from "./components/Home";
import CICD from "./components/CICD";
import cicdApi from "./api/cicdApi";

const drawerWidth = 240;

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState([]);

  // WebSocket connection at App level - stays open always
  useEffect(() => {
    console.log("🔌 Connecting WebSocket at App level...");

    cicdApi.setStatusUpdateCallback((statuses) => {
      console.log("Received status updates:", statuses);
      setStatusUpdates(statuses);
    });

    cicdApi.setConnectionChangeCallback((connected) => {
      console.log("WebSocket connection status:", connected);
    });

    cicdApi.connectWebSocket();

    // Cleanup only when app closes completely
    return () => {
      console.log("🔌 Disconnecting WebSocket...");
      cicdApi.disconnectWebSocket();
    };
  }, []); // Only once when app loads

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const tabs = [
    { id: 0, label: "Home", icon: <HomeIcon />, component: Home },
    { id: 1, label: "CI/CD", icon: <BuildIcon />, component: CICD },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Modern Web App
        </Typography>
      </Toolbar>
      <List>
        {tabs.map((tab) => (
          <ListItem key={tab.id} disablePadding>
            <ListItemButton
              selected={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{ color: activeTab === tab.id ? "inherit" : undefined }}
              >
                {tab.icon}
              </ListItemIcon>
              <ListItemText primary={tab.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const ActiveComponent = tabs[activeTab].component;

  // אם זה CICD, תן לו את statusUpdates
  const componentProps = activeTab === 1 ? { statusUpdates } : {};

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer - Left Side (LTR) */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          anchor="left"
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 0 }, // Account for mobile AppBar
        }}
      >
        <ActiveComponent {...componentProps} />
      </Box>

      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            display: { sm: "none" },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {tabs[activeTab].label}
            </Typography>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}

export default App;
