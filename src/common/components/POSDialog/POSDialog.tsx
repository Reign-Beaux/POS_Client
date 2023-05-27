import { Dialog, DialogProps } from "@mui/material";
import React from "react";

export interface POSDialogProps extends DialogProps {
  children: React.ReactNode;
}

const POSDialog: React.FC<POSDialogProps> = ({ children, ...rest }) => {
  return (
    <Dialog fullWidth {...rest}>
      {children}
    </Dialog>
  );
};

export default POSDialog;
