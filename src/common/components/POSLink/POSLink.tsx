import { Link, LinkProps } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
export interface POSLinkProps extends LinkProps {
  to: string;
}

const POSLink: React.FC<POSLinkProps> = ({ children, to, ...rest }) => {
  return (
    <Link component={RouterLink} to={to} color="textSecondary" {...rest}>
      {children}
    </Link>
  );
};

export default POSLink;