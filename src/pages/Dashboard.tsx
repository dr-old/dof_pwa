import ReportDesign from "../components/ReportDesign";
import ArcDesign from "../components/ArchDesign";
import { Grid, useTheme } from "@mui/material";
import RateDesign from "../components/RateDesign";

const Dashboard = () => {
  const theme = useTheme();

  const chartData = [
    {
      title: "Website Traffic",
      backgroundColor: theme.palette.warning.main,
      comp: (
        <ArcDesign
          title="Website Traffic"
          backgroundColor={theme.palette.warning.main}
        />
      ),
      data: [
        { x: "A", y: 3 },
        { x: "B", y: 5 },
        { x: "C", y: 7 },
      ],
    },
    {
      title: "Chart 2",
      backgroundColor: theme.palette.background.paper,
      comp: (
        <ReportDesign
          title="Full Report"
          backgroundColor={theme.palette.background.paper}
        />
      ),
      data: [
        { x: "A", y: 8 },
        { x: "B", y: 6 },
        { x: "C", y: 4 },
      ],
    },
    {
      title: "Chart 3",
      backgroundColor: theme.palette.secondary.main,
      comp: (
        <RateDesign
          title="Bounce Rate"
          backgroundColor={theme.palette.secondary.main}
        />
      ),
      data: [
        { x: "A", y: 2 },
        { x: "B", y: 4 },
        { x: "C", y: 9 },
      ],
    },
  ];

  return (
    <Grid
      container
      spacing={3}
      sx={{
        padding: theme.spacing(2),
        justifyContent: "center",
      }}>
      {chartData.map((chart, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          {chart.comp}
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
