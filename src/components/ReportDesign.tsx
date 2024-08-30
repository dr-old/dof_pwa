import { FileDownloadRounded } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";

interface ArcDesignProps {
  backgroundColor?: string;
  title?: string;
}

export default function ReportDesign({
  backgroundColor,
  title,
}: ArcDesignProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        minHeight: 320,
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            fontSize: "0.5rem",
            borderRadius: 20,
            textTransform: "none",
            paddingX: 2,
          }}>
          <Typography variant="caption">{title}</Typography>
        </Button>
        <Typography
          variant="subtitle2"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.warning.main
                : theme.palette.text.primary,
          }}>
          /2024
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%", // Full height of the parent container
          minHeight: 200, // Optional: to maintain some height
        }}>
        <Button
          variant="outlined"
          size="small"
          endIcon={<FileDownloadRounded fontSize="small" />}
          sx={{
            fontSize: "0.5rem",
            borderRadius: 4,
            textTransform: "none",
            paddingX: 2,
            paddingY: 2,
          }}>
          <Typography variant="caption">Download Report</Typography>
        </Button>
      </Box>
    </Box>
  );
}
