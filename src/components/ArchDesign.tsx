import { Box, Divider, Typography, useTheme } from "@mui/material";
import { hexToRgba } from "../utils/helpers";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const settings = {
  width: 160,
  height: 160,
  value: 60,
};

interface ArcDesignProps {
  backgroundColor?: string;
  title?: string;
}

interface DetailProps {
  backgroundColor?: string;
  title?: string;
  value?: string;
}

const Detail = ({ backgroundColor, title, value }: DetailProps) => {
  const theme = useTheme();
  const color =
    theme.palette.mode === "light"
      ? theme.palette.text.primary
      : theme.palette.background.default;

  return (
    <Box
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
      }}>
      <Typography
        variant="body2"
        sx={{
          color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        component="div" // Render as div to avoid <div> inside <p>
      >
        <Box
          sx={{
            width: 12,
            height: 12,
            backgroundColor,
            borderRadius: "30%",
            marginRight: 1,
          }}
        />
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color }} component="div">
        {" "}
        {/* Render as div */}
        {value}
      </Typography>
    </Box>
  );
};

export default function ArcDesign({ backgroundColor, title }: ArcDesignProps) {
  const theme = useTheme();
  const color =
    theme.palette.mode === "light"
      ? theme.palette.text.primary
      : theme.palette.background.default;
  const colorPaper =
    theme.palette.mode === "light"
      ? hexToRgba(theme.palette.text.primary, 0.5)
      : hexToRgba(theme.palette.background.paper, 0.5);

  return (
    <Box
      sx={{
        backgroundColor,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        textAlign: "center",
        minHeight: 320,
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ color }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: colorPaper }}>
          More
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1, // Make the Box take up all available space
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}>
        <Gauge
          {...settings}
          cornerRadius="50%" // Ensure Gauge handles this prop correctly
          text={({ value }) => `${value}K`}
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText} text`]: {
              fontSize: 35,
              fill: color, // Change the text color
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: color,
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: colorPaper,
            },
          })}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}>
        <Detail backgroundColor={color} title="Social Media" value="78%" />
        <Divider sx={{ backgroundColor: hexToRgba(color, 0.2), my: 1 }} />
        <Detail
          backgroundColor={colorPaper}
          title="Organic Search"
          value="22%"
        />
      </Box>
    </Box>
  );
}
