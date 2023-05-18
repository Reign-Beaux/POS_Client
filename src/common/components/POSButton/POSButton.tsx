import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";

export interface POSButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const POSButton: React.FC<POSButtonProps> = ({ children, isLoading, ...rest }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      style={{ marginTop: "15px", width: "150px" }}
      {...rest}
    >
      {isLoading ? <CircularProgress size={24} /> : <>{children}</>}
    </Button>
  );
};

export default POSButton;
