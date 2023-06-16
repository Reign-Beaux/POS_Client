import { Link, LinkProps } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
export interface POSLinkProps extends LinkProps {
  /**
   * Ruta de destino del enlace.
   */
  to: string;
}

/**
 * Enlace personalizado para navegación interna.
 *
 * Este componente muestra un enlace utilizando el componente `Link` de Material-UI
 * y utiliza `react-router-dom` para la navegación interna. Se pueden proporcionar propiedades adicionales
 * para personalizar el aspecto y el comportamiento del enlace.
 */
const POSLink: React.FC<POSLinkProps> = ({ children, to, ...rest }) => {
  return (
    <Link component={RouterLink} to={to} color="textSecondary" {...rest}>
      {children}
    </Link>
  );
};

export default POSLink;