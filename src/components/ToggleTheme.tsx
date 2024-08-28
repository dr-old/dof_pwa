import { useColorMode } from "../context/useColorMode";
import { Brightness4Rounded, Brightness7Rounded } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";

interface ToggleThemeProps {
  reverseColor?: boolean; // Optional prop to control color reversal
}

const ToggleTheme: React.FC<ToggleThemeProps> = ({ reverseColor = false }) => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const backgroundColor = reverseColor
    ? theme.palette.primary.main
    : theme.palette.background.default;
  const color = !reverseColor
    ? theme.palette.primary.main
    : theme.palette.mode === "light"
    ? theme.palette.warning.main
    : theme.palette.background.default;

  return (
    <Button
      variant="contained"
      size="small"
      onClick={toggleColorMode}
      startIcon={
        theme.palette.mode === "light" && (
          <Box
            sx={{
              backgroundColor,
              color,
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Brightness4Rounded fontSize="small" color="inherit" />
          </Box>
        )
      }
      endIcon={
        theme.palette.mode === "dark" && (
          <Box
            sx={{
              backgroundColor,
              color,
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Brightness7Rounded fontSize="small" color="inherit" />
          </Box>
        )
      }
      sx={{
        marginTop: 5,
        fontSize: "0.5rem",
        borderRadius: 20,
        textTransform: "capitalize",
        paddingX: 1,
        backgroundColor: color,
        "&:hover": {
          backgroundColor: color,
        },
      }}>
      <Typography variant="caption" color={backgroundColor}>
        {theme.palette.mode} mode
      </Typography>
    </Button>
  );
};

export default ToggleTheme;
