import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import ListMenu from "./ListMenu";
import AppBar from "./AppBar";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

// import { AuthGuard } from '@/components/auth/auth-guard';
// import { MainNav } from '@/components/dashboard/layout/main-nav';
// import { SideNav } from '@/components/dashboard/layout/side-nav';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(): React.JSX.Element {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // Controls the menu slide-in/slide-out
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          bgcolor: "var(--mui-palette-background-paper)",
          // bgcolor: theme.palette.primary.main,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          position: "relative",
          minHeight: "100%",
        }}>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            // pl: { lg: "var(--SideNav-width)" },
            borderRadius: theme.shape.borderRadius * 2,
            backgroundColor: theme.palette.background.darker,
            mx: { xs: 1, sm: 2, md: 3, lg: 4 },
            my: { xs: 1, sm: 2, md: 3, lg: 4 },
            p: { xs: 1, sm: 2, md: 3, lg: 4 },
          }}>
          {/* Header */}
          <AppBar
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            isMobile={isMobile}
          />
          <main>
            <Container maxWidth="xl" sx={{ py: "64px" }}>
              <Outlet />
            </Container>
          </main>
        </Box>
        <ListMenu
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          isMobile={isMobile}
        />
      </Box>
    </React.Fragment>
  );
}
