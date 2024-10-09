/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Learning Center Overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              14%
            </MDTypography>{" "}
            more enrollments this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="school"
          title="5 New Courses Released"
          dateTime="2 OCT 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="assignment_turned_in"
          title="120 Lessons Completed"
          dateTime="21 SEP 11 PM"
        />
        <TimelineItem
          color="info"
          icon="person_add"
          title="15 New Users Enrolled"
          dateTime="21 SEP 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="rate_review"
          title="3 New Course Feedbacks"
          dateTime="20 AUG 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="update"
          title="Platform Update: New Features Added"
          dateTime="18 SEP 4:54 AM"
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
