import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import ListMenu from "./ListMenu";
import AppBar from "./AppBar";
import { styled, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { colors } from "../utils/colors";

const BoxContent = styled(Box)(({ theme }) => ({
  bgcolor: "var(--mui-palette-background-paper)",
  display: "flex",
  position: "relative",
  minHeight: "100%",
}));

const BoxMain = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  backgroundColor:
    theme.palette.mode === "dark"
      ? colors.dark.background.darker
      : colors.light.background.darker,
}));

export default function Layout(): React.JSX.Element {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // Controls the menu slide-in/slide-out
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <BoxContent sx={{ flexDirection: isMobile ? "column" : "row" }}>
        <BoxMain
          sx={{
            mr: { xs: 1, sm: 2, md: 0, lg: 0 },
            ml: { xs: 1, sm: 2, md: 3, lg: 4 },
            my: { xs: 1, sm: 2, md: 3, lg: 4 },
            p: { xs: 1, sm: 2, md: 3, lg: 4 },
            borderRadius: theme.shape.borderRadius * 2,
          }}>
          <AppBar
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            isMobile={isMobile}
          />
          <main>
            <Container maxWidth="lg" sx={{ py: "64px" }}>
              <Outlet />
            </Container>
          </main>
        </BoxMain>
        <ListMenu
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          isMobile={isMobile}
        />
      </BoxContent>
    </React.Fragment>
  );
}
