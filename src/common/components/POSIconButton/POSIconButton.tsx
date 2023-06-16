import { IconButton, IconButtonProps, SxProps, Theme, Tooltip, useTheme } from "@mui/material";
import React from "react";
export interface POSIconButtonProps extends IconButtonProps {
  /**
   * Texto que se mostrará en el tooltip al pasar el ratón por encima del botón.
   */
  tooltipText?: string;
}

/**
 * Botón de icono personalizado.
 *
 * Este componente muestra un botón de icono utilizando el componente `IconButton` de Material-UI.
 * Se pueden proporcionar propiedades adicionales para personalizar el aspecto y el comportamiento del botón.
 * También se puede agregar un texto al tooltip que se muestra al pasar el ratón por encima del botón.
 */

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
