import { Box, Container, styled, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import ActivityIndicator from "./ActivityIndicator";

interface LoginProps {
  children: ReactNode;
  loading?: boolean;
}

const BoxMain = styled(Box)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.shape.borderRadius * 2.5,
  backgroundColor: theme.palette.primary.main,
}));

const LayoutAuth: React.FC<LoginProps> = ({ children, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      {loading && <ActivityIndicator fullScreen={true} />}
      <Box
        sx={{
          height: isMobile ? "100%" : "100vh",
          padding: { xs: 1, sm: 2, md: 3, lg: 4 },
        }}>
        <BoxMain
          sx={{
            padding: { xs: 3, sm: 2, md: 3, lg: 4 },
          }}>
          <Container maxWidth="xl">{children}</Container>
        </BoxMain>
      </Box>
    </React.Fragment>
  );
};

export default LayoutAuth;
