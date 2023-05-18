import { Dialog } from "@mui/material";
import React from "react";

export interface POSDialogProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const POSDialog: React.FC<POSDialogProps> = ({ isOpen, children }) => {
  return (
    <Dialog open={isOpen} fullWidth>
      {children}
    </Dialog>
  );
};

export default POSDialog;
