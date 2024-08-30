import { BarChartRounded } from "@mui/icons-material";
import { hexToRgba } from "../utils/helpers";
import { Box, Typography, useTheme } from "@mui/material";
import {
  ChartContainer,
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts";
import { colors } from "../utils/colors";

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

interface ArcDesignProps {
  backgroundColor?: string;
  title?: string;
}
export default function LineDesign({ backgroundColor, title }: ArcDesignProps) {
  const theme = useTheme();

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
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              bgcolor: colors.dark.background.darker,
              width: 30,
              height: 30,
              borderRadius: 2,
              marginRight: 1,
            }}>
            <BarChartRounded fontSize="small" color="warning" />
          </Box>
          {title}
        </Typography>
        <Typography variant="caption">Details</Typography>
      </Box>
      <Box
        sx={{
          my: 2,
          height: 200, // Adjust the height of the chart
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}>
          <Typography variant="h4">282%</Typography>
          <Typography
            variant="caption"
            color={hexToRgba(theme.palette.text.primary, 0.5)}>
            Return On Investment
          </Typography>
        </Box>
        <ChartContainer
          width={500}
          height={300}
          series={[{ type: "line", data: pData }]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              stroke: theme.palette.primary.main,
              strokeWidth: 2,
            },
            [`& .${markElementClasses.root}`]: {
              stroke: theme.palette.primary.main,
              scale: "0.6",
              fill: "#fff",
              strokeWidth: 2,
            },
          }}
          disableAxisListener>
          <LinePlot />
          <MarkPlot />
        </ChartContainer>
      </Box>
    </Box>
  );
}
