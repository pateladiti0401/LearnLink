import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Collapse,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";
import { ChevronRight, ExpandMore, Folder } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import api from "./../api";

function Details() {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [activeFolder, setActiveFolder] = useState("");
  const [error, setError] = useState(null);
  const [mdContent, setMdContent] = useState(""); // Store fetched Markdown content
  const [fetchedFolders, setFetchedFolders] = useState({}); // Track fetched folders

  // Fetch data from API once, triggered only on initial component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await api.get(`/api/labs/${name}`);

        // Only set data if it's different from the current data
        if (JSON.stringify(response.data) !== JSON.stringify(data)) {
          const filteredData = removeGithubFolder(response.data); // Remove .github folder
          setData(filteredData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load content.");
      } finally {
        setLoading(false); // End loading
      }
    };

    // Fetch data only if not already fetched (to avoid repeated API calls)
    if (!data) {
      fetchData();
    }
  }, [name, data]); // Depend on `name` and `data` to avoid re-fetching

  // Function to remove `.github` folder from API data
  const removeGithubFolder = (data) => {
    if (!data) return data;
    for (const key in data) {
      if (key === ".github") {
        delete data[key];
      } else if (typeof data[key] === "object") {
        data[key] = removeGithubFolder(data[key]);
      }
    }
    return data;
  };

  // Fetch Markdown or Python content from URL
  const fetchContent = async (url, type) => {
    if (fetchedFolders[url]) return; // Skip if already fetched

    try {
      const response = await axios.get(url);
      if (type === "md") {
        setMdContent(response.data);
      } else {
        setMdContent(response.data); // Set Python or other content
      }

      setFetchedFolders((prev) => ({ ...prev, [url]: true })); // Mark this folder as fetched
    } catch (error) {
      console.error(`Error fetching ${type} file:`, error);
      setError(`Failed to load ${type} content.`);
    }
  };

  // Get content for the active folder
  const getCurrentContent = () => {
    if (!data || !activeFolder) return null;

    const paths = activeFolder.split("/");

    let currentContent = data;
    for (let i = 0; i < paths.length; i++) {
      currentContent = currentContent[paths[i]];
      if (!currentContent) return null;
    }

    return currentContent;
  };

  // Render content based on file type
  const renderFolderContent = (content) => {
    if (!content) {
      return <Typography>No content available.</Typography>;
    }

    if (typeof content === "string") {
      if (content.startsWith("https://raw.githubusercontent.com")) {
        if (content.endsWith(".md")) {
          fetchContent(content, "md"); // Fetch Markdown content
          return <ReactMarkdown>{mdContent}</ReactMarkdown>;
        } else if (content.endsWith(".py")) {
          fetchContent(content, "py"); // Fetch Python content
          return (
            <pre
              style={{
                background: "#f5f5f5",
                padding: "10px",
                borderRadius: "4px",
                overflowX: "auto",
              }}
            >
              {mdContent}
            </pre>
          );
        }
      }

      // Handle other file types (e.g., image, video, JSON)
      if (content.endsWith(".mp4")) {
        return (
          <video controls style={{ maxWidth: "100%", maxHeight: "400px" }}>
            <source src={content} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      } else if (
        content.endsWith(".jpg") ||
        content.endsWith(".png") ||
        content.endsWith(".jpeg")
      ) {
        return (
          <img src={content} alt="file content" style={{ maxWidth: "100%", height: "auto" }} />
        );
      } else if (
        content.endsWith(".yml") ||
        content.endsWith(".yaml") ||
        content.endsWith(".json")
      ) {
        try {
          const parsedContent = JSON.parse(content); // Parse JSON/YAML
          return (
            <pre
              style={{
                background: "#f5f5f5",
                padding: "10px",
                borderRadius: "4px",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(parsedContent, null, 2)}
            </pre>
          );
        } catch {
          return <Typography>Error parsing file content.</Typography>;
        }
      } else {
        return (
          <Typography
            style={{
              whiteSpace: "pre-wrap",
              background: "#f9f9f9",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            {content}
          </Typography>
        );
      }
    }

    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <div key={index}>{typeof item === "string" && renderFolderContent(item)}</div>
      ));
    }

    return Object.entries(content)
      .filter(([_, value]) => hasValidContent(value))
      .map(([key, value]) => (
        <Box key={key} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {key}
          </Typography>
          {renderFolderContent(value)}
        </Box>
      ));
  };

  // Check if folder has valid content (non-empty)
  const hasValidContent = (value) => {
    if (typeof value === "string") return value.trim() !== "";
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object" && value !== null) {
      return Object.values(value).some((v) => hasValidContent(v));
    }
    return false;
  };

  // Toggle folder expansion
  const toggleFolder = (folder) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder], // Toggle folder expansion
    }));
  };

  // Render Sidebar Items
  const renderSidebarItems = (items, path = "") => {
    if (!items || typeof items !== "object") return null;

    return Object.entries(items)
      .filter(([_, value]) => hasValidContent(value)) // Filter out empty folders
      .map(([key, value]) => {
        const currentPath = path ? `${path}/${key}` : key;
        const isExpandable = value && typeof value === "object" && !Array.isArray(value);

        return (
          <div key={currentPath}>
            <ListItem
              button
              onClick={() => {
                if (isExpandable) {
                  toggleFolder(currentPath);
                }
                setActiveFolder(currentPath);
              }}
              sx={{
                backgroundColor:
                  activeFolder === currentPath ? "rgba(0, 123, 255, 0.1)" : "transparent",
                "&:hover": { backgroundColor: "rgba(0, 123, 255, 0.1)" },
              }}
            >
              {isExpandable && (
                <div className="mr-2">
                  {expandedFolders[currentPath] ? <ExpandMore /> : <ChevronRight />}
                </div>
              )}
              <Folder className="mr-2" />
              <ListItemText primary={key} />
            </ListItem>
            <Divider sx={{ my: 1 }} /> {/* Divider between folders */}
            {isExpandable && (
              <Collapse in={expandedFolders[currentPath]} timeout="auto" unmountOnExit>
                <List className="ml-4">{renderSidebarItems(value, currentPath)}</List>
              </Collapse>
            )}
          </div>
        );
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} sx={{ backgroundColor: "#f4f6f9", p: 3 }}>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              height: "100vh",
              p: 3,
              backgroundColor: "#fff", // White background for sidebar
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow for the sidebar
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Folders
            </Typography>
            <List>{renderSidebarItems(data)}</List>
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box
            sx={{
              p: 3,
              backgroundColor: "#fff", // White background for right content area
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Box shadow for the content area
              borderRadius: "8px",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              {activeFolder ? activeFolder.split("/").pop() : "Lab Content"}
            </Typography>
            <Box sx={{ mt: 3 }}>{renderFolderContent(getCurrentContent())}</Box>
          </Box>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Details;
