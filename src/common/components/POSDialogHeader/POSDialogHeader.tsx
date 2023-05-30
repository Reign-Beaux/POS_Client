import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Toolbar, IconButton, Typography, Button, Tooltip } from "@mui/material";
import React from "react";

export type POSDialogHeaderProps = {
  titleDialog: string;
  setIsOpenDialog: Function;
};

const POSDialogHeader: React.FC<POSDialogHeaderProps> = ({ titleDialog, setIsOpenDialog }) => {
  return (
    <AppBar sx={{ position: "relative" }}>
      <Toolbar sx={{ display: "flex" }}>
        <div style={{ flex: "50%" }}>
          <Typography sx={{ ml: 2, flex: 1, color: "white" }} variant="h6" component="div">
            {titleDialog}
          </Typography>
        </div>
        <div style={{ flex: "50%", textAlign: "end", color: "white" }}>
          <Tooltip title="Cerrar">
            <IconButton aria-label="logOut" onClick={() => setIsOpenDialog(false)} style={{ color: "white" }} >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default POSDialogHeader;
