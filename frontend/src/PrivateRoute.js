import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/authentication/sign-in" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  // isPublic: PropTypes.bool,
};

export default PrivateRoute;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Box, Grid, List, ListItem, ListItemText, Collapse, CircularProgress } from "@mui/material";
// import { ChevronRight, ExpandMore, Folder } from "@mui/icons-material";
// import ReactMarkdown from "react-markdown";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import api from "./../api";

// function Details() {
//   const { name } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [expandedFolders, setExpandedFolders] = useState({});
//   const [activeFolder, setActiveFolder] = useState("");
//   const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       // const response = await axios.get(`http://localhost:8000/api/labs/${name}`);
//   //       const response = await api.get(`/api/labs/${name}`);
//   //       console.log("API Response:", response.data);
//   //       setData(response.data);
//   //     } catch (err) {
//   //       console.error("Error loading data:", err);
//   //       setError("Failed to load content.");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [name]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(`/api/labs/${name}`);
//         setData(response.data);
//       } catch (err) {
//         console.error("Error loading data:", err);
//         setError("Failed to load content.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [name]);

//   const toggleFolder = (folderPath) => {
//     setExpandedFolders((prev) => ({
//       ...prev,
//       [folderPath]: !prev[folderPath],
//     }));
//   };

//   // const renderFolderContent = (content) => {
//   //   if (!content) return null;
//   //   // If content is a string (e.g., readme URL), render accordingly
//   //   if (typeof content === "string") {
//   //     if (content.endsWith(".mp4")) {
//   //       return (
//   //         <video controls className="w-full max-h-96">
//   //           <source src={content} type="video/mp4" />
//   //           Your browser does not support the video tag.
//   //         </video>
//   //       );
//   //     } else if (content.endsWith(".md")) {
//   //       return <ReactMarkdown>{`[View Markdown File](${content})`}</ReactMarkdown>;
//   //     } else {
//   //       return (
//   //         <a href={content} target="_blank" rel="noopener noreferrer">
//   //           {content}
//   //         </a>
//   //       );
//   //     }
//   //   }
//   //   // If content is an array, render each item
//   //   if (Array.isArray(content)) {
//   //     return content.map((item, index) => (
//   //       <div key={index} className="mb-4">
//   //         {typeof item === "string" && renderFolderContent(item)}
//   //       </div>
//   //     ));
//   //   }
//   //   // If content is an object, recursively render its keys and values
//   //   return Object.entries(content).map(([key, value]) => (
//   //     <div key={key} className="mb-4">
//   //       <h3 className="text-lg font-semibold mb-2">{key}</h3>
//   //       {renderFolderContent(value)}
//   //     </div>
//   //   ));
//   // };

//   // const renderSidebarItems = (items, path = "") => {
//   //   if (!items || typeof items !== "object") return null;

//   //   return Object.entries(items).map(([key, value]) => {
//   //     const currentPath = path ? `${path}/${key}` : key;
//   //     const isExpandable = value && typeof value === "object" && !Array.isArray(value);

//   //     return (
//   //       <div key={currentPath}>
//   //         <ListItem
//   //           button
//   //           onClick={() => {
//   //             if (isExpandable) {
//   //               toggleFolder(currentPath);
//   //             }
//   //             setActiveFolder(currentPath);
//   //           }}
//   //           className={`rounded-md ${activeFolder === currentPath ? "bg-blue-50" : ""}`}
//   //         >
//   //           {isExpandable && (
//   //             <div className="mr-2">
//   //               {expandedFolders[currentPath] ? <ExpandMore /> : <ChevronRight />}
//   //             </div>
//   //           )}
//   //           <Folder className="mr-2" />
//   //           <ListItemText primary={key} />
//   //         </ListItem>

//   //         {isExpandable && (
//   //           <Collapse in={expandedFolders[currentPath]} timeout="auto" unmountOnExit>
//   //             <List className="pl-4">{renderSidebarItems(value, currentPath)}</List>
//   //           </Collapse>
//   //         )}
//   //       </div>
//   //     );
//   //   });
//   // };

//   // Function to check if a folder or object contains valid content
//   const hasValidContent = (value) => {
//     if (typeof value === "string") return value.trim() !== ""; // Non-empty string
//     if (Array.isArray(value)) return value.length > 0; // Non-empty array
//     if (typeof value === "object" && value !== null) {
//       // Check if any nested key has valid content
//       return Object.values(value).some((v) => hasValidContent(v));
//     }
//     return false;
//   };

//   // Render Sidebar Items with Valid Content Only
//   const renderSidebarItems = (items, path = "") => {
//     if (!items || typeof items !== "object") return null;

//     return Object.entries(items)
//       .filter(([_, value]) => hasValidContent(value)) // Filter out empty folders
//       .map(([key, value]) => {
//         const currentPath = path ? `${path}/${key}` : key;
//         const isExpandable = value && typeof value === "object" && !Array.isArray(value);

//         return (
//           <div key={currentPath}>
//             <ListItem
//               button
//               onClick={() => {
//                 if (isExpandable) {
//                   toggleFolder(currentPath);
//                 }
//                 setActiveFolder(currentPath);
//               }}
//               className={`rounded-md ${activeFolder === currentPath ? "bg-blue-50" : ""}`}
//             >
//               {isExpandable && (
//                 <div className="mr-2">
//                   {expandedFolders[currentPath] ? <ExpandMore /> : <ChevronRight />}
//                 </div>
//               )}
//               <Folder className="mr-2" />
//               <ListItemText primary={key} />
//             </ListItem>

//             {isExpandable && (
//               <Collapse in={expandedFolders[currentPath]} timeout="auto" unmountOnExit>
//                 <List className="pl-4">{renderSidebarItems(value, currentPath)}</List>
//               </Collapse>
//             )}
//           </div>
//         );
//       });
//   };

//   // Render Folder Content Only if it Has Valid Data
//   const renderFolderContent = (content) => {
//     if (!content || !hasValidContent(content)) return <p>No content available.</p>;

//     if (typeof content === "string") {
//       if (content.endsWith(".mp4")) {
//         return (
//           <video controls className="w-full max-h-96">
//             <source src={content} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         );
//       } else if (content.endsWith(".md")) {
//         return <ReactMarkdown>{`[View Markdown File](${content})`}</ReactMarkdown>;
//       } else {
//         return (
//           <a href={content} target="_blank" rel="noopener noreferrer">
//             {content}
//           </a>
//         );
//       }
//     }

//     if (Array.isArray(content)) {
//       return content.map((item, index) => (
//         <div key={index} className="mb-4">
//           {typeof item === "string" && renderFolderContent(item)}
//         </div>
//       ));
//     }

//     return Object.entries(content)
//       .filter(([_, value]) => hasValidContent(value)) // Filter out empty objects
//       .map(([key, value]) => (
//         <div key={key} className="mb-4">
//           <h3 className="text-lg font-semibold mb-2">{key}</h3>
//           {renderFolderContent(value)}
//         </div>
//       ));
//   };

//   const getCurrentContent = () => {
//     if (!activeFolder) return data;
//     return activeFolder.split("/").reduce((obj, key) => obj && obj[key], data);
//   };

//   if (loading) {
//     return (
//       <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
//         <CircularProgress size={60} />
//       </Grid>
//     );
//   }
//   if (error) return <div>{error}</div>;
//   if (!data) return <div>No data found for {name}.</div>;

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Grid container spacing={2}>
//         <Grid item xs={3}>
//           <Box className="border border-gray-200 rounded-lg p-4">
//             <h2 className="text-xl font-bold mb-4">Folders</h2>
//             <List>
//               <ListItem
//                 button
//                 onClick={() => setActiveFolder("")}
//                 className={`rounded-md ${activeFolder === "" ? "bg-blue-50" : ""}`}
//               >
//                 <Folder className="mr-2" />
//                 <ListItemText primary="Root" />
//               </ListItem>
//               {renderSidebarItems(data)}
//             </List>
//           </Box>
//         </Grid>

//         <Grid item xs={9}>
//           <Box className="border border-gray-200 rounded-lg p-4">
//             <h1 className="text-2xl font-bold mb-6">
//               {activeFolder ? activeFolder.split("/").pop() : "Root Folder"}
//             </h1>
//             {renderFolderContent(getCurrentContent())}
//           </Box>
//         </Grid>
//       </Grid>
//     </DashboardLayout>
//   );
// }

// export default Details;
