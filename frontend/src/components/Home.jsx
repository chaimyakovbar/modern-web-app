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
import homeApi from "../api/homeApi";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await homeApi.getHomeData();
        setData(result);
      } catch (err) {
        setError(err.message);
        // Fallback data is handled in homeApi.getHomeData()
        // Try again to get fallback data
        try {
          const result = await homeApi.getHomeData();
          setData(result);
        } catch {
          // If even fallback fails, keep error state
        }
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
