// import React, { useState } from "react";
// import { Box, MenuItem, Select, Typography, Paper, Divider } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// function NewLab() {
//   const [action, setAction] = useState("create");
//   const [repoName, setRepoName] = useState("");
//   const [collaborator, setCollaborator] = useState("");
//   const navigate = useNavigate();

//   const handleFormSubmit = async () => {
//     const payload = {
//       action,
//       repoName,
//       collaborator,
//     };

//     try {
//       await axios.post("http://localhost:8000/api/manage-repo", payload);
//       alert("Repository managed successfully!");
//       navigate("/"); // Redirect back to home after successful POST
//     } catch (error) {
//       alert("Error managing repository. Please try again.");
//     }
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox py={3} display="flex" justifyContent="center">
//         <Paper
//           elevation={3}
//           sx={{
//             width: { xs: "90%", sm: "75%", md: "60%", lg: "50%" },
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
//             Add New Lab
//           </Typography>

//           <Divider sx={{ my: 2 }} />

//           <Box component="form" display="flex" flexDirection="column" gap={3}>
//             {/* Action Dropdown */}
//             <MDBox>
//               <Typography variant="subtitle1" color="textSecondary" mb={1}>
//                 Select Action
//               </Typography>
//               <Select
//                 value={action}
//                 onChange={(e) => setAction(e.target.value)}
//                 fullWidth
//                 displayEmpty
//                 variant="outlined"
//                 sx={{
//                   bgcolor: "background.paper",
//                   borderRadius: 1,
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: "grey.300",
//                     },
//                     "&:hover fieldset": {
//                       borderColor: "primary.main",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "primary.main",
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="create">Create Repository</MenuItem>
//                 <MenuItem value="fork">Fork Repository</MenuItem>
//               </Select>
//             </MDBox>

//             {/* Repository Name */}
//             <MDBox>
//               <Typography variant="subtitle1" color="textSecondary" mb={1}>
//                 Repository Name
//               </Typography>
//               <MDInput
//                 placeholder="Enter repository name"
//                 value={repoName}
//                 onChange={(e) => setRepoName(e.target.value)}
//                 fullWidth
//               />
//             </MDBox>

//             {/* Collaborator */}
//             <MDBox>
//               <Typography variant="subtitle1" color="textSecondary" mb={1}>
//                 Collaborator
//               </Typography>
//               <MDInput
//                 placeholder="Enter collaborator name"
//                 value={collaborator}
//                 onChange={(e) => setCollaborator(e.target.value)}
//                 fullWidth
//               />
//             </MDBox>

//             {/* Submit Button */}
//             <Box mt={2} display="flex" justifyContent="center">
//               <MDButton
//                 variant="contained"
//                 color="success"
//                 onClick={handleFormSubmit}
//                 sx={{
//                   py: 1.2,
//                   width: { xs: "100%", sm: "80%", md: "60%" },
//                   fontWeight: "bold",
//                   fontSize: "1rem",
//                   "&:hover": {
//                     bgcolor: "success.dark",
//                   },
//                 }}
//               >
//                 Submit
//               </MDButton>
//             </Box>
//           </Box>
//         </Paper>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default NewLab;
import React, { useState } from "react";
import { Box, MenuItem, Select, Typography, Paper, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function NewLab() {
  const [action, setAction] = useState("create");
  const [repoName, setRepoName] = useState("");
  const [collaborator, setCollaborator] = useState("");
  const [forkOwner, setForkOwner] = useState(""); // New state for fork owner
  const [forkRepo, setForkRepo] = useState(""); // New state for fork repo
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    // Define payload based on action type
    const payload =
      action === "create" ? { action, repoName, collaborator } : { action, forkOwner, forkRepo };

    try {
      await axios.post("http://localhost:8000/api/manage-repo", payload);
      alert("Repository managed successfully!");
      navigate("/"); // Redirect back to home after successful POST
    } catch (error) {
      alert("Error managing repository. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} display="flex" justifyContent="center">
        <Paper
          elevation={3}
          sx={{
            width: { xs: "90%", sm: "75%", md: "60%", lg: "50%" },
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Add New Lab
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box component="form" display="flex" flexDirection="column" gap={3}>
            {/* Action Dropdown */}
            <MDBox>
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                Select Action
              </Typography>
              <Select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                fullWidth
                displayEmpty
                variant="outlined"
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey.300",
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              >
                <MenuItem value="create">Create Repository</MenuItem>
                <MenuItem value="fork">Fork Repository</MenuItem>
              </Select>
            </MDBox>

            {/* Fields for Create Action */}
            {action === "create" && (
              <>
                <MDBox>
                  <Typography variant="subtitle1" color="textSecondary" mb={1}>
                    Repository Name
                  </Typography>
                  <MDInput
                    placeholder="Enter repository name"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    fullWidth
                  />
                </MDBox>
                <MDBox>
                  <Typography variant="subtitle1" color="textSecondary" mb={1}>
                    Collaborator
                  </Typography>
                  <MDInput
                    placeholder="Enter collaborator name"
                    value={collaborator}
                    onChange={(e) => setCollaborator(e.target.value)}
                    fullWidth
                  />
                </MDBox>
              </>
            )}

            {/* Fields for Fork Action */}
            {action === "fork" && (
              <>
                <MDBox>
                  <Typography variant="subtitle1" color="textSecondary" mb={1}>
                    Fork Owner
                  </Typography>
                  <MDInput
                    placeholder="Enter fork owner"
                    value={forkOwner}
                    onChange={(e) => setForkOwner(e.target.value)}
                    fullWidth
                  />
                </MDBox>
                <MDBox>
                  <Typography variant="subtitle1" color="textSecondary" mb={1}>
                    Fork Repository Name
                  </Typography>
                  <MDInput
                    placeholder="Enter fork repository name"
                    value={forkRepo}
                    onChange={(e) => setForkRepo(e.target.value)}
                    fullWidth
                  />
                </MDBox>
              </>
            )}

            {/* Submit Button */}
            <Box mt={2} display="flex" justifyContent="center">
              <MDButton
                variant="contained"
                color="success"
                onClick={handleFormSubmit}
                sx={{
                  py: 1.2,
                  width: { xs: "100%", sm: "80%", md: "60%" },
                  fontWeight: "bold",
                  fontSize: "1rem",
                  "&:hover": {
                    bgcolor: "success.dark",
                  },
                }}
              >
                Submit
              </MDButton>
            </Box>
          </Box>
        </Paper>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewLab;
