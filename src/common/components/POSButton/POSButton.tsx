import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";

export interface POSButtonProps extends ButtonProps {
  /**
   * Indica si el botón está en estado de carga.
   */
  isLoading?: boolean;
}

/**
 * Componente personalizado de botón.
 *
 * @remarks
 * Extiende el componente `Button` de Material-UI y muestra un indicador de progreso si `isLoading` es `true`.
 *
 * @example
 * ```jsx
 * <POSButton isLoading={true}>Guardar</POSButton>
 * ```
 */
const POSButton: React.FC<POSButtonProps> = ({ children, isLoading, ...rest }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      style={{ marginTop: "15px", width: "150px" }}
      {...rest}>
      {isLoading ? <CircularProgress size={24} /> : <>{children}</>}
    </Button>
  );
};

export default POSButton;
