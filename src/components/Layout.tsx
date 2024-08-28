import {
  Box,
  Container,
  Drawer,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import AppBar from "./AppBar";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import ListMenu from "./ListMenu";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const Layout: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container
      sx={{
        maxWidth: { xs: "100%", sm: "90%", md: "100%" },
        background: theme.palette.primary.main,
      }}>
      <Box
        sx={{
          height: "auto",
          paddingX: { xs: 1, sm: 2 }, // Responsive padding inside the box
          paddingY: { xs: 2, sm: 3 }, // Responsive padding inside the box
        }}>
        <Box
          sx={{
            display: "flex",
            borderRadius: theme.shape.borderRadius * 2.5,
            backgroundColor: theme.palette.background.default,
          }}>
          {/* Main Content and Side Menu */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRightColor: theme.palette.divider,
              borderRightWidth: 1,
              flex: 1,
              padding: 1, // Responsive padding inside the box
            }}>
            {/* Header */}
            <AppBar
              setOpen={handleDrawerOpen}
              open={open}
              isMobile={isMobile}
            />

            {/* Content Area */}
            <Box
              sx={{
                paddingX: { xs: 2, sm: 3, md: 4 },
                paddingY: { xs: 3, sm: 3, md: 4 },
              }}>
              <Outlet />
            </Box>
          </Box>

          {/* Side Menu */}
          {isMobile ? (
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  backgroundColor: theme.palette.background.default,
                },
              }}
              variant="persistent"
              anchor="right"
              open={open}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronLeftRounded fontSize="small" />
                  ) : (
                    <ChevronRightRounded fontSize="small" />
                  )}
                </IconButton>
              </DrawerHeader>
              <ListMenu />
            </Drawer>
          ) : (
            <Box
              sx={{
                height: "100vh",
                overflowY: "auto",
                width: drawerWidth,
                padding: 1, // Responsive padding inside the box
              }}>
              <ListMenu />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Layout;
