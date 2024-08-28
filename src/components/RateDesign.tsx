import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { hexToRgba } from "../utils/helpers";
import { ArrowOutwardRounded } from "@mui/icons-material";
import { useState } from "react";

const settings = {
  width: 170,
  height: 170,
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
        }}>
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
      <Typography variant="body2" sx={{ color }}>
        {value}
      </Typography>
    </Box>
  );
};

export default function RateDesign({ backgroundColor, title }: ArcDesignProps) {
  const theme = useTheme();
  const [isSelected, setSelected] = useState<number | null>(null);
  const color =
    theme.palette.mode === "light"
      ? theme.palette.text.primary
      : theme.palette.background.default;

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
        <IconButton
          sx={{
            width: 35, // Adjust the size as needed
            height: 35, // Adjust the size as needed
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%", // Fully rounded
            backgroundColor: color, // Light background for better visibility
            color: theme.palette.secondary.main,
          }}>
          <ArrowOutwardRounded fontSize="small" color="inherit" />
        </IconButton>
      </Box>
      <Box
        sx={{
          height: 200, // Adjust the height of the chart
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          columnGap: 2,
        }}>
        {[
          { title: "Mon", value: 2 },
          { title: "Tue", value: 3 },
          { title: "Wed", value: 4 },
        ].map((item, index) => {
          return (
            <Box
              key={index.toString()}
              onClick={() => setSelected(item.value)}
              sx={{
                width: 70,
                height: 70,
                borderWidth: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor:
                  isSelected === item.value
                    ? theme.palette.warning.main
                    : hexToRgba(color, 0.3),
                borderRadius: 3,
                backgroundColor:
                  isSelected === item.value
                    ? theme.palette.warning.main
                    : "transparent",
              }}>
              <Typography
                variant="caption"
                sx={{
                  color,
                  display: "flex",
                  justifyContent: "cnter",
                  alignItems: "cnter",
                  flexDirection: "column",
                }}>
                {item.title}
                <Typography variant="caption" fontWeight={600} sx={{ color }}>
                  {item.value}
                </Typography>
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}>
        <Typography variant="h4" sx={{ color }}>
          23%
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: hexToRgba(color, 0.3) }}
        />
        <Typography
          variant="caption"
          sx={{
            color,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
          }}>
          <Typography variant="caption" fontWeight={600} sx={{ color }}>
            -10%
          </Typography>
          Since last day
        </Typography>
      </Box>
    </Box>
  );
}
