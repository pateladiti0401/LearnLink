import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CoverLayout from "layouts/authentication/components/CoverLayout";
// ReportsBarChart configurations
import configs from "examples/Charts/BarCharts/ReportsBarChart/configs";
import bgImage from "assets/images/bg-reset-cover.jpeg";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportsBarChart({ color, image, title, description, date, chart }) {
  // const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const handleCardClick = () => {
    // navigate("/details", { state: { title, description, date, chart } });
  };
  return (
    <Card sx={{ height: "100%" }} onClick={handleCardClick}>
      <MDBox padding="1rem">
        <MDBox mb={2} display="flex" justifyContent="center">
          <img
            // src="./assets/images/bg-reset-cover.jpeg"
            src={image}
            alt="Description of image"
            style={{ maxWidth: "80%", height: "50%", borderRadius: "8px" }}
          />
          {/* <CoverLayout coverHeight="1vh" image={bgImage}></CoverLayout> */}
        </MDBox>
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
          {/* <Divider /> */}
          {/* <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            {/* <MDTypography variant="button" color="text" fontWeight="light">
              {date}
            </MDTypography> */}
          {/* </MDBox> */}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ReportsBarChart
ReportsBarChart.defaultProps = {
  color: "info",
  description: "",
};

// Typechecking props for the ReportsBarChart
ReportsBarChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  image: PropTypes.img,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])),
};

export default ReportsBarChart;
