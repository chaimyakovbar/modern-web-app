import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Alert,
} from "@mui/material";
import {
  Home as HomeIcon,
  TrendingUp,
  People,
  Speed,
} from "@mui/icons-material";
import config from "../config/config";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await config.api.http.get(
          config.api.endpoints.home.dashboard
        );
        setData(result);
      } catch (err) {
        setError(err.message);
        // Fallback data (same as previous API fallback)
        setData({
          title: "Welcome to Avnet",
          description: "This is the home dashboard with sample data.",
          stats: [
            { label: "Total Users", value: 1250, trend: "+12%" },
            { label: "Active Activity", value: 89, trend: "+5%" },
            { label: "Performance", value: 94, trend: "+2%" },
          ],
          recentActivity: [
            { action: "User Login", time: "2 minutes ago", status: "success" },
            { action: "Data Sync", time: "5 minutes ago", status: "success" },
            { action: "System Update", time: "1 hour ago", status: "warning" },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading home data...
        </Typography>
      </Box>
    );
  }

  if (error && !data) {
    return <Alert severity="error">Failed to load data: {error}</Alert>;
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          <HomeIcon sx={{ mr: 2, verticalAlign: "middle" }} />
          {data?.title || "Home Dashboard"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {data?.description || "Welcome to your dashboard"}
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {data?.stats?.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {index === 0 && <People color="primary" />}
                  {index === 1 && <Speed color="secondary" />}
                  {index === 2 && <TrendingUp color="success" />}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {stat.label}
                  </Typography>
                </Box>
                <Typography variant="h4" color="primary">
                  {stat.value}
                </Typography>
                <Chip
                  label={stat.trend}
                  color="success"
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          {data?.recentActivity?.map((activity, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
                borderBottom:
                  index < data.recentActivity.length - 1
                    ? "1px solid #eee"
                    : "none",
              }}
            >
              <Typography variant="body2">{activity.action}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={activity.status}
                  color={activity.status === "success" ? "success" : "warning"}
                  size="small"
                />
                <Typography variant="caption" color="text.secondary">
                  {activity.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
