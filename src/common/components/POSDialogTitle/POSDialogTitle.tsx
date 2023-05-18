import CloseIcon from "@mui/icons-material/Close";
import { DialogTitle, IconButton, Tooltip } from "@mui/material";
import React from "react";
import "./POSDialogTitle.css";

export interface POSDialogTitleProps {
  titleDialog: string;
  setIsOpenDialog: Function;
}

const POSDialogTitle: React.FC<POSDialogTitleProps> = ({ titleDialog, setIsOpenDialog }) => {
  return (
    <DialogTitle sx={{ display: "flex" }}>
      <div style={{ flex: "50%" }}>{titleDialog}</div>
      <div style={{ flex: "50%", textAlign: "end" }}>
        <Tooltip title="Cerrar">
          <IconButton aria-label="logOut" onClick={() => setIsOpenDialog(false)}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </div>
    </DialogTitle>
  );
};

export default POSDialogTitle;
