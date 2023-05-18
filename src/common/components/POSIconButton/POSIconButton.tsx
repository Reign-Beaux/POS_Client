import { IconButton, IconButtonProps, SxProps, Theme, Tooltip, useTheme } from "@mui/material";
import React from "react";
export interface POSIconButtonProps extends IconButtonProps {
  tooltipText?: string;
}

const POSIconButton: React.FC<POSIconButtonProps> = ({ tooltipText = "", children, ...rest }) => {
  const theme = useTheme();
  const style: SxProps<Theme> = {
    color: theme.palette.primary.contrastText,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  };
  return (
    <Tooltip title={tooltipText}>
      <IconButton aria-label="setting" color="primary" sx={style} {...rest}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default POSIconButton;
