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
import cicdApi from "../api/cicdApi";

const CICD = ({ statusUpdates = [] }) => {
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [newRun, setNewRun] = useState(null);

  // WebSocket connection removed - it's now in App.jsx and stays open always

  // Function to handle new run
  const handleNewRun = (run) => {
    setNewRun(run);
    // Send run to backend via API
    cicdApi.sendRunRequest(run);
    // Reset newRun after we passed it
    setTimeout(() => setNewRun(null), 100);
  };

  // const getStatusIcon = (status) => {
  //   switch (status) {
  //     case "success":
  //       return <CheckCircle color="success" />;
  //     case "failed":
  //       return <Error color="error" />;
  //     case "running":
  //       return <PlayArrow color="primary" />;
  //     default:
  //       return <Schedule color="disabled" />;
  //   }
  // };

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case "success":
  //       return "success";
  //     case "failed":
  //       return "error";
  //     case "running":
  //       return "primary";
  //     default:
  //       return "default";
  //   }
  // };

  // if (loading) {
  //   return (
  //     <Box>
  //       <LinearProgress />
  //       <Typography variant="h6" sx={{ mt: 2 }}>
  //         טוען נתוני CI/CD...
  //       </Typography>
  //     </Box>
  //   );
  // }

  // if (error && !data) {
  //   return <Alert severity="error">נכשל בטעינת הנתונים: {error}</Alert>;
  // }

  return (
    <Box>
      <AddNewRun onNewRun={handleNewRun} />

      <TrackingTable newRun={newRun} statusUpdates={statusUpdates} />

      {/* <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          <BuildIcon sx={{ mr: 2, verticalAlign: "middle" }} />
          {data?.title || "לוח בקרה CI/CD"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {data?.description ||
            "עקוב אחר צינורות האינטגרציה והפריסה הרציפים שלכם"}
        </Typography>
      </Box> */}

      {/* Pipeline Status */}
      {/* <Grid container spacing={3} sx={{ mb: 4 }}>
        {data?.pipelines?.map((pipeline) => (
          <Grid item xs={12} md={6} lg={4} key={pipeline.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {getStatusIcon(pipeline.status)}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {pipeline.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Branch: {pipeline.branch}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Duration: {pipeline.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Last run: {pipeline.lastRun}
                </Typography>
                <Chip
                  label={pipeline.status.toUpperCase()}
                  color={getStatusColor(pipeline.status)}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid> */}

      {/* Recent Deployments */}
      {/* <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            פריסות אחרונות
          </Typography>
          <List>
            {data?.recentDeployments?.map((deployment, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    {getStatusIcon(deployment.status)}
                  </ListItemIcon>
                  <ListItemText
                    primary={`${deployment.environment} - ${deployment.version}`}
                    secondary={deployment.time}
                  />
                  <Chip
                    label={deployment.status}
                    color={getStatusColor(deployment.status)}
                    size="small"
                  />
                </ListItem>
                {index < data.recentDeployments.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card> */}
    </Box>
  );
};

export default CICD;
