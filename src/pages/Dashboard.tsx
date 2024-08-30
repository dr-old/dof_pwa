import ReportDesign from "../components/ReportDesign";
import ArcDesign from "../components/ArchDesign";
import { Grid, useTheme } from "@mui/material";
import RateDesign from "../components/RateDesign";
import LineDesign from "../components/LineDesign";
import BarDesign from "../components/BarDesign";

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      spacing={3}
      sx={{
        paddingY: theme.spacing(2),
        justifyContent: "center",
      }}>
      <Grid item xs={12} sm={6} md={4}>
        <ArcDesign
          title="Website Traffic"
          backgroundColor={theme.palette.warning.main}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ReportDesign
          title="Full Report"
          backgroundColor={theme.palette.background.paper}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <RateDesign
          title="Bounce Rate"
          backgroundColor={theme.palette.secondary.main}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <LineDesign
          title="ROI"
          backgroundColor={theme.palette.background.paper}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <BarDesign title="Customer Churn Rate" />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
