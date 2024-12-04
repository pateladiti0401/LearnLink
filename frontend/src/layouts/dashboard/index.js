import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Link, useNavigate } from "react-router-dom";
import api from "./../api";
import theme from "assets/theme";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography, IconButton } from "@mui/material";
import MDButton from "components/MDButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

function Dashboard() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  const handleLabClick = (repo) => {
    const isAuthenticated = !!localStorage.getItem("token"); // Check if user is authenticated

    if (isAuthenticated) {
      navigate(`/labs/${repo}`);
    } else {
      navigate("/authentication/sign-in");
    }
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await api.get("/api/labs");
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
    const theme = useTheme();

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Full page height
          backgroundColor: theme.palette.background.default, // Adapt background to theme
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "#333", // White text in dark mode
            marginBottom: "20px",
          }}
        >
          Loading, please wait...
        </Typography>
        <CircularProgress
          size={60}
          thickness={5}
          sx={{
            color: theme.palette.primary.main,
          }}
        />
      </Box>
    );
  }

  if (error) {
    const theme = useTheme();

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Full page height
          backgroundColor: theme.palette.background.default, // Adapt background to theme
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.error.main, // Error color from the theme
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Oops! Something went wrong.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary, // Text color adapts to theme
            textAlign: "center",
          }}
        >
          Error: {error}
        </Typography>
      </Box>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRepos = filteredRepos.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

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
      </MDBox>
      <Grid container spacing={3} sx={{ padding: "20px" }}>
        {currentRepos.length > 0 ? (
          currentRepos.map((repo, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                onClick={() => handleLabClick(`${repo}`)}
                sx={{
                  backgroundImage: `linear-gradient(to top right, ${theme.palette.primary.main}, #000)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#000", // Fallback color in case the gradient isn't supported
                  borderRadius: "12px",
                  padding: "20px",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Initial black shadow
                  transition:
                    "transform 0.3s ease, background-image 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, #000)`, // Gradient on hover using primary and secondary theme colors
                    color: "#fff", // White text on hover
                    transform: "scale(1.05)", // Slight zoom effect
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)", // Darker shadow on hover
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#fff", // White text initially
                    fontWeight: "600",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                  {repo}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#fff", // White text initially
                    textAlign: "center",
                    fontSize: "0.9rem",
                    marginTop: "8px",
                    transition: "color 0.3s ease",
                  }}
                >
                  Click to explore details
                </Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#aaa",
              fontSize: "1.2rem",
              marginTop: "20px",
            }}
          >
            No Labs Found
          </Typography>
        )}
        <Grid item xs={12}>
          {/* Pagination Controls */}
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              marginTop: "50px",
              gap: "20px",
            }}
          >
            {/* Previous Button */}
            <MDButton
              variant="contained"
              color="primary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              sx={{
                minWidth: "40px",
                minHeight: "40px",
                borderRadius: "100%",
                opacity: currentPage === 1 ? 0.6 : 1,
                pointerEvents: currentPage === 1 ? "none" : "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowBackIosIcon fontSize="small" />
            </MDButton>

            {/* Page Information */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                color: theme.palette.mode === "dark" ? "#fff" : "#333",
                textAlign: "center",
              }}
            >
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </Typography>

            {/* Next Button */}
            <MDButton
              variant="contained"
              color="primary"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              sx={{
                minWidth: "40px",
                minHeight: "40px",
                borderRadius: "100%",
                opacity: currentPage === totalPages ? 0.6 : 1,
                pointerEvents: currentPage === totalPages ? "none" : "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Dashboard;
