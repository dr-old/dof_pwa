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
  Switch,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { EditRounded, ExitToAppRounded } from "@mui/icons-material";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import AlertDialog from "./AlertDialog";

// Styled component for the ListItemButton to make it rounded
const RoundedListItemButton = styled(ListItemButton)(({ theme }) => ({
  opacity: 0.6,
  borderRadius: theme.shape.borderRadius * 2.5,
  transition: "background-color 0.3s ease",
  "&:hover": {
    opacity: 0.85,
    backgroundColor: theme.palette.action.hover,
  },
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const ListMenu: React.FC = () => {
  const { logOut } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

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
    <>
      {/* User info section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}>
        <Typography
          variant="h5"
          color={
            theme.palette.mode === "dark" ? "warning.main" : "primary.main"
          }
          fontWeight={600}
          sx={{ mb: 5 }}>
          DOF
        </Typography>
        <Avatar
          src="https://i.pravatar.cc/150?img=2" // Replace with actual image URL
          alt="User Image"
          sx={{ width: 80, height: 80, marginBottom: 2 }}
        />
        <Typography variant="caption" sx={{ mb: 1 }}>
          Danni Ramdan
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
            <RoundedListItemButton onClick={item.onClick}>
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
      <AlertDialog
        open={open}
        onClose={handleClose}
        title="Confirm Logout"
        content="Are you sure you want to log out?"
        onConfirm={handleLogout}
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
};

export default ListMenu;
