// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import api from "./../api";
// Overview page components
import Header from "layouts/profile/components/Header";

function Overview() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await api.get("/logout"); // Call the logout API
      // localStorage.removeItem("token"); // Optional: Clear token from localStorage if used
      navigate("/authentication/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox component="form" sx={{ padding: "16px" }}>
          <MDBox mb={2}>
            <MDInput type="text" label="Name" fullWidth />
          </MDBox>

          <MDBox mb={2}>
            <MDInput type="tel" label="Phone Number" fullWidth />
          </MDBox>

          <MDBox mb={2}>
            <MDInput type="email" label="Email" fullWidth />
          </MDBox>

          <MDBox mb={2}>
            <MDInput type="url" label="LinkedIn Link" fullWidth />
          </MDBox>

          <MDBox mb={2}>
            <MDInput type="url" label="GitHub Link" fullWidth />
          </MDBox>

          <MDBox mt={3}>
            <MDButton variant="outlined" color="secondary" fullWidth onClick={handleLogout}>
              Logout
            </MDButton>
          </MDBox>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
