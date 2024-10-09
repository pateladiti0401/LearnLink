// import React, { useState, useEffect } from "react";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// // prop-types is a library for typechecking of props.
// import PropTypes from "prop-types";

// // @mui material components
// import Card from "@mui/material/Card";
// import Grid from "@mui/material/Grid";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Icon from "@mui/material/Icon";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";

// // Material Dashboard 2 React base styles
// import breakpoints from "assets/theme/base/breakpoints";

// // Images
// import burceMars from "assets/images/bruce-mars.jpg";
// import backgroundImage from "assets/images/bg-profile.jpeg";

// function Header({ children }) {
//   const [tabsOrientation, setTabsOrientation] = useState("horizontal");
//   const [tabValue, setTabValue] = useState(0);
//   const [avatarSrc, setAvatarSrc] = useState(burceMars); // Default image
//   const [openDialog, setOpenDialog] = useState(false);

//   useEffect(() => {
//     // A function that sets the orientation state of the tabs.
//     function handleTabsOrientation() {
//       return window.innerWidth < breakpoints.values.sm
//         ? setTabsOrientation("vertical")
//         : setTabsOrientation("horizontal");
//     }

//     /**
//      The event listener that's calling the handleTabsOrientation function when resizing the window.
//     */
//     window.addEventListener("resize", handleTabsOrientation);

//     // Call the handleTabsOrientation function to set the state with the initial value.
//     handleTabsOrientation();

//     // Remove event listener on cleanup
//     return () => window.removeEventListener("resize", handleTabsOrientation);
//   }, [tabsOrientation]);

//   const handleSetTabValue = (event, newValue) => {
//     setTabValue(newValue);
//     if (newValue === 1) {
//       // Assuming "Change photo" is at index 1
//       setOpenDialog(true);
//     }
//   };
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setAvatarSrc(imageUrl);
//       setOpenDialog(false);
//     }
//   };
//   const handleCameraClick = () => {
//     document.getElementById("upload-photo").click();
//   };
//   return (
//     <MDBox position="relative" mb={5}>
//       <MDBox
//         display="flex"
//         alignItems="center"
//         position="relative"
//         minHeight="18.75rem"
//         borderRadius="xl"
//         sx={{
//           backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
//             `${linearGradient(
//               rgba(gradients.info.main, 0.01),
//               rgba(gradients.info.state, 0.01)
//             )}, url(${backgroundImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "50%",
//           overflow: "hidden",
//         }}
//       />
//       <Card
//         sx={{
//           position: "relative",
//           mt: -8,
//           mx: 3,
//           py: 2,
//           px: 2,
//         }}
//       >
//         <Grid container spacing={3} alignItems="center">
//           <Grid item>
//             <MDAvatar
//               src={burceMars}
//               alt="profile-image"
//               size="xl"
//               shadow="sm"
//               sx={{ width: 200, height: 200 }}
//             />
//           </Grid>
//           <Grid item>
//             <MDBox height="100%" mt={0.5} lineHeight={1}>
//               <MDTypography variant="h5" fontWeight="medium">
//                 Richard Davis
//               </MDTypography>
//             </MDBox>
//             <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
//               <Tab label="Change photo" sx={{ padding: "0 16px" }} />
//             </Tabs>
//           </Grid>
//           <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//             <DialogTitle>Select Photo</DialogTitle>
//             <DialogContent>
//               <Button variant="contained" component="label">
//                 Choose from Gallery
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   hidden
//                   id="upload-photo"
//                 />
//               </Button>
//               <Button variant="contained" onClick={handleCameraClick}>
//                 Use Camera
//               </Button>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//             </DialogActions>
//           </Dialog>
//         </Grid>
//         {children}
//       </Card>
//     </MDBox>
//   );
// }

// // Setting default props for the Header
// Header.defaultProps = {
//   children: "",
// };

// // Typechecking props for the Header
// Header.propTypes = {
//   children: PropTypes.node,
// };

// export default Header;
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import breakpoints from "assets/theme/base/breakpoints";
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import MDButton from "components/MDButton";

const Header = ({ children }) => {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [avatarSrc, setAvatarSrc] = useState(burceMars); // Default image
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarSrc(imageUrl);
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.01),
              rgba(gradients.info.state, 0.01)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={avatarSrc} // Use avatarSrc state
              alt="profile-image"
              size="xl"
              shadow="sm"
              sx={{ width: 200, height: 200 }}
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Richard Davis
              </MDTypography>
            </MDBox>
            <MDButton
              variant="contained"
              onClick={handleOpenDialog}
              sx={{ marginTop: "10px" }}
              color="primary"
            >
              Change Photo
            </MDButton>
          </Grid>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
              Select a Photo
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={(theme) => ({
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                })}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Please choose a photo from your computer to use as your profile image.
              </Typography>
              <MDButton variant="contained" component="label" color="primary">
                Upload from Computer
                <input type="file" accept="image/*" onChange={handleFileChange} hidden />
              </MDButton>
              {selectedImage && (
                <div style={{ marginTop: "20px" }}>
                  <Typography>Preview:</Typography>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseDialog}>
                Done
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
};

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
