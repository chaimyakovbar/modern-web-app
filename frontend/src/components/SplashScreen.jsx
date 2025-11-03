import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

/**
 * Splash Screen Component
 * Shows logo/image for 1 second before displaying the main app
 */

import logo from "../assets/logo.png";
const SplashScreen = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTextFallback, setShowTextFallback] = useState(false);

  useEffect(() => {
    // Show splash screen for 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageError = () => {
    // If image fails to load, show text fallback
    setShowTextFallback(true);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0F14",
          zIndex: 9999,
          transition: "opacity 0.3s ease-out",
        }}
      >
        {/* Logo/Image Section - Full Screen */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Option 1: Full Screen Image */}
          {/* Uses logo from assets folder or public folder */}
          {!showTextFallback && (
            <Box
              component="img"
              src={logo || "/logo.png"}
              alt="Avnet Logo"
              sx={{
                width: "50vw",
                height: "50vh",
                objectFit: "cover",
                display: "block",
                position: "absolute",
                top: 180,
                left: 350,
                zIndex: 1,
              }}
              onError={handleImageError}
            />
          )}

          {/* Option 2: Text Logo - Full Screen (shown if image doesn't exist) */}
          {showTextFallback && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#111111",
                fontSize: "4rem",
                fontWeight: 700,
                letterSpacing: "8px",
                width: "100%",
                height: "100%",
              }}
            >
              AVNET
            </Box>
          )}
        </Box>

        {/* Loading Shimmer Effect - Sliding from right to left */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* Shimmer bar that slides across */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
              animation: "slideShimmer 2s infinite",
              "@keyframes slideShimmer": {
                "0%": {
                  left: "-100%",
                },
                "100%": {
                  left: "100%",
                },
              },
            }}
          />

          {/* Additional shimmer bars for layered effect */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "80%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
              animation: "slideShimmer2 2.5s infinite 0.3s",
              "@keyframes slideShimmer2": {
                "0%": {
                  left: "-100%",
                },
                "100%": {
                  left: "100%",
                },
              },
            }}
          />
        </Box>
      </Box>
    );
  }

  return <>{children}</>;
};

export default SplashScreen;
