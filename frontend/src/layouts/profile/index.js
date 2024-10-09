// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile/components/Header";

function Overview() {
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
            <MDButton variant="outlined" color="secondary" fullWidth>
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
