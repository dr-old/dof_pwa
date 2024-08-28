import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface ActivityIndicatorProps {
  size?: number;
  color?: "primary" | "secondary" | "inherit";
  thickness?: number;
  fullScreen?: boolean; // To display as full screen loading
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size = 40,
  color = "primary",
  thickness = 3.6,
  fullScreen = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: fullScreen ? "100vw" : "100%",
        height: fullScreen ? "100vh" : "100%",
        position: fullScreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        backgroundColor: fullScreen
          ? "rgba(255, 255, 255, 0.7)"
          : "transparent",
        zIndex: fullScreen ? 1300 : "auto", // Full-screen mode brings it on top of other content
      }}>
      <CircularProgress size={size} color={color} thickness={thickness} />
    </Box>
  );
};

export default ActivityIndicator;
