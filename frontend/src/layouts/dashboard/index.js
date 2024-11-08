// @mui material components
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import coverImage from "../../assets/images/bg-reset-cover.jpeg";
import { Link } from "react-router-dom";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/labs");
        setReports(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    // return <div>Loading...</div>; // You can add a loader or spinner here
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if fetching fails
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="New Releases"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="people"
                title="Active Users"
                count="1,200"
                percentage={{
                  color: "success",
                  amount: "+15%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Lessons Completed"
                count="950"
                percentage={{
                  color: "success",
                  amount: "+8%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="New Sign-ups"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {reports.slice(0, 3).map((report) => (
              <Grid item xs={12} md={6} lg={4} key={report.url}>
                <Link to={`/labs/${report.name}`} style={{ textDecoration: "none" }}>
                  <ReportsBarChart
                    image={coverImage} // Image path
                    title={report.name}
                    description={report.description}
                    chart={reportsBarChartData}
                    imageStyle={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>

          <MDBox mt={4}>
            <Grid container spacing={3}>
              {/* Second Section: Remaining Reports */}
              {reports.slice(3).map((report) => (
                <Grid item xs={12} md={6} lg={4} key={report.url}>
                  <Link to={`/report/${report.id}`} style={{ textDecoration: "none" }}>
                    <ReportsBarChart
                      image={coverImage} // Image path
                      title={report.name}
                      description={report.description}
                      chart={reportsBarChartData}
                      imageStyle={{ width: "100%", height: "150px", objectFit: "cover" }}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </MDBox>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
