import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import coverImage from "../../assets/images/bg-reset-cover.jpeg";
import { Link } from "react-router-dom";

import TextField from "@mui/material/TextField";

function Dashboard() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/labs");
        setRepos(response.data.repos); // Updated to use the repos array
        setFilteredRepos(response.data.repos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRepos(repos.filter((repo) => repo.toLowerCase().includes(query)));
  };
  if (loading) {
    return <div>Loading...</div>; // Display a loader if the API is loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if fetching fails
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <TextField
            fullWidth
            label="Search Labs"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
          />
        </MDBox>

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
          {/* <Grid container spacing={3}>
            {repos.slice(0, 3).map((repo, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Link to={`/labs/${repo}`} style={{ textDecoration: "none" }}>
                  <ReportsBarChart
                    image={coverImage} // Image path
                    title={repo}
                    description={`Details about ${repo}`}
                    chart={{ labels: ["Demo"], datasets: [] }} // Dummy chart data
                    imageStyle={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                </Link>
              </Grid>
            ))}
          </Grid> */}
          <MDBox>
            {filteredRepos.length > 0 ? (
              <Grid container spacing={3}>
                {filteredRepos.map((repo, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Link to={`/labs/${repo}`} style={{ textDecoration: "none" }}>
                      <ReportsBarChart
                        image={coverImage} // Image path
                        title={repo}
                        description={`Details about ${repo}`}
                        chart={{ labels: ["Demo"], datasets: [] }} // Dummy chart data
                        imageStyle={{ width: "100%", height: "150px", objectFit: "cover" }}
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <MDBox mt={2}>
                <p>No labs found matching.</p>
              </MDBox>
            )}
          </MDBox>
          {/* <MDBox mt={4.5}>
            <Grid container spacing={3}>
              {filteredRepos.map((repo, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Link to={`/labs/${repo}`} style={{ textDecoration: "none" }}>
                    <ReportsBarChart
                      image={coverImage} // Image path
                      title={repo}
                      description={`Details about ${repo}`}
                      chart={{ labels: ["Demo"], datasets: [] }} // Dummy chart data
                      imageStyle={{ width: "100%", height: "150px", objectFit: "cover" }}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </MDBox>
          <MDBox mt={4}>
            <Grid container spacing={3}>
              {repos.slice(3).map((repo, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Link to={`/labs/${repo}`} style={{ textDecoration: "none" }}>
                    <ReportsBarChart
                      image={coverImage} // Image path
                      title={repo}
                      description={`Details about ${repo}`}
                      chart={{ labels: ["Demo"], datasets: [] }} // Dummy chart data
                      imageStyle={{ width: "100%", height: "150px", objectFit: "cover" }}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </MDBox> */}
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
