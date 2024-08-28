import { Box, Container, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

interface LoginProps {
  children: ReactNode;
}

const LayoutAuth: React.FC<LoginProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        maxWidth: { xs: "100%", sm: "90%", md: "100%" },
      }}>
      <Box
        sx={{
          height: "100vh",
          paddingX: { xs: 1, sm: 2 }, // Responsive padding inside the box
          paddingY: { xs: 2, sm: 3 }, // Responsive padding inside the box
        }}>
        <Box
          sx={{
            height: "100%",
            padding: { xs: 2, sm: 3 }, // Responsive padding inside the box
            borderRadius: theme.shape.borderRadius * 2.5,
            backgroundColor: theme.palette.primary.main,
          }}>
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default LayoutAuth;
