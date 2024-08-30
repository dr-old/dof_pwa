import { hexToRgba } from "../utils/helpers";
import {
  CloseRounded,
  MenuOpenRounded,
  NotificationsOutlined,
  SearchRounded,
} from "@mui/icons-material";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface HeaderProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

// MuiAppBar

const Header = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<HeaderProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
  boxShadow: "none", // Remove shadow
  backgroundColor: theme.palette.background.default, // Ensure background color is set
  backgroundImage: "none", // Ensure no background image is applied
}));

const OutlinedIconButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${hexToRgba(theme.palette.text.secondary, 0.6)}`,
  borderRadius: theme.shape.borderRadius * 2.5,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  opacity: 0.6,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const BorderlessTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none", // Remove the border
    },
    "&:hover fieldset": {
      border: "none", // Ensure no border on hover
    },
    "&.Mui-focused fieldset": {
      border: "none", // Ensure no border when focused
    },
    "& input": {
      fontSize: "0.75rem", // Set font size for input text
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.75rem", // Set font size for the label if needed
  },
}));

interface AppBarProps {
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
  isMobile?: boolean;
}

const AppBar = ({ isMenuOpen, toggleMenu, isMobile }: AppBarProps) => {
  const { state } = useLocation();
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <Header sx={{ backgroundColor: "transparent" }}>
      <Toolbar>
        {((isMobile && !openSearch) || !isMobile) && (
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {state.title}
          </Typography>
        )}
        {((isMobile && openSearch) || !isMobile) && (
          <BorderlessTextField
            variant="outlined"
            size="small"
            placeholder="Search something..."
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchRounded fontSize="small" />
                </IconButton>
              ),
            }}
            sx={{ mx: 2, width: isMobile ? "100%" : "auto" }}
          />
        )}
        {isMobile && !openSearch && (
          <OutlinedIconButton
            color="inherit"
            aria-label="open search"
            edge="start"
            onClick={() => setOpenSearch(!openSearch)}
            sx={{ marginRight: 1 }}>
            <SearchRounded fontSize="small" />
          </OutlinedIconButton>
        )}
        {isMobile && openSearch && (
          <IconButton
            color="inherit"
            aria-label="close search"
            edge="start"
            onClick={() => setOpenSearch(!openSearch)}
            sx={{ marginRight: 1 }}>
            <CloseRounded fontSize="small" />
          </IconButton>
        )}
        <OutlinedIconButton color="inherit">
          <NotificationsOutlined fontSize="small" />
        </OutlinedIconButton>
        {isMobile && (
          <OutlinedIconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleMenu}
            sx={{ marginLeft: 1 }}>
            <MenuOpenRounded fontSize="small" />
          </OutlinedIconButton>
        )}
      </Toolbar>
    </Header>
  );
};

export default AppBar;
