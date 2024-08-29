import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import ActivityIndicator from "./ActivityIndicator";

interface LoginProps {
  children: ReactNode;
  loading?: boolean;
}

const LayoutAuth: React.FC<LoginProps> = ({ children, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      {loading && <ActivityIndicator fullScreen={true} />}
      <Box
        sx={{
          height: isMobile ? "100%" : "100vh",
          padding: { xs: 1, sm: 2, md: 3, lg: 4 }, // Responsive padding inside the box
        }}>
        <Box
          sx={{
            height: "100%",
            padding: { xs: 3, sm: 2, md: 3, lg: 4 }, // Responsive padding inside the box
            borderRadius: theme.shape.borderRadius * 2.5,
            backgroundColor: theme.palette.primary.main,
          }}>
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default LayoutAuth;
