import { Box, Typography, styled, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useState } from "react";

interface ArcDesignProps {
  title?: string;
}

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

const BoxBar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: "center",
  minHeight: 320,
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
}));

const BoxBarTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

const BoxBarBody = styled(Box)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  columnGap: 2,
  // height: 200,
  flex: "1 1 auto",
}));

export default function BarDesign({ title }: ArcDesignProps) {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Handle bar click event
  const handleBarClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <BoxBar
      sx={{
        borderRadius: theme.shape.borderRadius,
      }}>
      <BoxBarTitle>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
      </BoxBarTitle>
      <BoxBarBody>
        <BarChart
          width={500}
          height={250}
          series={[
            {
              data: pData,
            },
          ]}
          xAxis={[
            {
              data: xLabels,
              scaleType: "band",
              colorMap: {
                type: "piecewise",
                thresholds: [new Date(2021, 1, 1)],
                colors: [theme.palette.primary.main],
              },
            },
          ]}
          borderRadius={10}
          onItemClick={(_, d) => {
            handleBarClick(d.dataIndex);
          }}
          data-testid="bar-chart"
        />
      </BoxBarBody>
    </BoxBar>
  );
}
