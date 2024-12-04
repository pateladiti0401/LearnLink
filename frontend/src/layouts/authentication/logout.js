// components/LogoutDialog.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import api from "../api";

function LogoutDialog() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    try {
      // Call the logout API
      await api.get("/logout");
      // Clear token from localStorage and redirect to sign-in page
      localStorage.removeItem("token");
      navigate("/authentication/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to log out? You will need to sign in again to access your account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogout} color="secondary" autoFocus>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutDialog;
