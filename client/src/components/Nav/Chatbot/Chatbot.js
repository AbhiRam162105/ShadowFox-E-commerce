import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import Adb from "@mui/icons-material/Adb";
import { height } from "@mui/system";

function SimpleDialog({ open, selectedValue, onClose }) {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <iframe
        src="https://chatbot-app-v6nbmvm4evdi7ep7yjblvx.streamlit.app?embedded=true"
        style={{ width: 500, height: 800 }}
      ></iframe>
    </Dialog>
  );
}

function Chatbot() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Adb onClick={handleClickOpen} />

      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default Chatbot;
