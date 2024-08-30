import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import TextSnippetRounded from "@mui/icons-material/TextSnippetRounded";
import EventRounded from "@mui/icons-material/EventRounded";
import TuneRounded from "@mui/icons-material/TuneRounded";
import {
  Box,
  ListItemButton,
  Avatar,
  Typography,
  Button,
  useTheme,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  CloseRounded,
  EditRounded,
  ExitToAppRounded,
} from "@mui/icons-material";
import { useAuth } from "../context/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import AlertDialog from "./AlertDialog";

// Styled component for the ListItemButton to make it rounded
const RoundedListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  transition: "background-color 0.3s ease",
  "&:hover": {
    opacity: 1,
    backgroundColor: theme.palette.action.hover,
  },
}));

interface ListMenuProps {
  isMenuOpen: boolean;
  isMobile: boolean;
  toggleMenu: () => void;
}

const ListMenu: React.FC<ListMenuProps> = ({
  isMobile,
  isMenuOpen,
  toggleMenu,
}) => {
  const { state } = useLocation();
  const { logOut, user } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false); // Controls the AlertDialog

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setOpen(false);
    logOut();
    navigate("/login", { replace: true });
  };

  // Define the menu items
  const menu = [
    {
      title: "Dashboard",
      onClick: () => {
        navigate("/dashboard", { state: { title: "Dashboard" } });
      },
      icon: <DashboardRounded fontSize="small" />,
    },
    {
      title: "Activity",
      onClick: () => {
        navigate("/activity", { state: { title: "Activity" } });
      },
      icon: <TextSnippetRounded fontSize="small" />,
    },
    {
      title: "Schedule",
      onClick: () => {
        navigate("/schedule", { state: { title: "Schedule" } });
      },
      icon: <EventRounded fontSize="small" />,
    },
    {
      title: "Settings",
      onClick: () => {
        navigate("/settings", { state: { title: "Settings" } });
      },
      icon: <TuneRounded fontSize="small" />,
    },
    {
      title: "Log Out",
      onClick: () => handleOpen(),
      icon: <ExitToAppRounded fontSize="small" />,
    },
  ];

  return (
    <React.Fragment>
      {/* Sliding Menu */}
      <Box
        sx={[
          {
            height: "100%",
            minWidth: "250px",
            px: 2,
            backgroundColor: theme.palette.background.default,
          },
          isMobile
            ? {
                pb: 2,
                position: "fixed",
                top: 0,
                right: 0, // Changed from left to right
                transform: isMenuOpen ? "translateX(0)" : "translateX(100%)", // Updated translateX
                transition: "transform 0.3s ease-in-out",
                boxShadow: isMenuOpen ? theme.shadows[5] : "none",
                zIndex: 1200, // Ensure it stays on top
                overflowX: "auto",
              }
            : {
                my: { xs: 1, sm: 2, md: 3, lg: 4 },
              },
        ]}>
        {/* User info section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
          }}>
          {isMobile && (
            <IconButton onClick={toggleMenu} sx={{ alignSelf: "flex-start" }}>
              <CloseRounded fontSize="small" />
            </IconButton>
          )}
          <Typography
            variant="h5"
            color={
              theme.palette.mode === "dark" ? "warning.main" : "primary.main"
            }
            fontWeight={600}
            sx={{ mb: 3, mt: 2 }}>
            DOF
          </Typography>
          <Avatar
            src={user?.photo || "https://i.pravatar.cc/150?img=2"}
            alt={user?.fullname}
            sx={{ width: 80, height: 80, marginBottom: 2 }}
          />
          <Typography variant="caption" sx={{ mb: 1 }}>
            {user?.fullname}
          </Typography>
          {/* Replace with actual name */}
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditRounded fontSize="small" />}
            sx={{
              marginTop: 1,
              fontSize: "0.5rem",
              borderRadius: 20,
              textTransform: "none",
              paddingX: 2,
            }}>
            <Typography variant="caption">Edit Profile</Typography>
          </Button>
        </Box>

        {/* Menu items */}
        <List>
          {menu.map((item, index) => (
            <ListItem key={index}>
              <RoundedListItemButton
                sx={{
                  py: 2,
                  opacity: item.title === state.title ? 1 : 0.6,
                  backgroundColor:
                    item.title === state.title
                      ? theme.palette.action.hover
                      : "transparent",
                }}
                onClick={item.onClick}>
                {item.icon}
                <Typography variant="caption" paddingLeft={1.5}>
                  {item.title}
                </Typography>
              </RoundedListItemButton>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <ToggleTheme />
        </Box>
      </Box>

      <AlertDialog
        open={open}
        onClose={handleClose}
        title="Confirm Logout"
        content="Are you sure you want to log out?"
        onConfirm={handleLogout}
        confirmText="Logout"
        cancelText="Cancel"
      />
    </React.Fragment>
  );
};

export default ListMenu;
