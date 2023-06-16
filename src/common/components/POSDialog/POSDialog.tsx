import { Dialog, DialogProps, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

export interface POSDialogProps extends DialogProps {
  /**
   * Elementos secundarios que se mostrarán dentro del dialog.
   */
  children: React.ReactNode;
}

/**
 * Dialog personalizado.
 *
 * Este componente muestra un diálogo personalizado utilizando el componente `Dialog` de Material-UI.
 * Se pueden proporcionar elementos secundarios para mostrar dentro del diálogo y se pueden aplicar
 * propiedades y opciones específicas.
 */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const POSDialog: React.FC<POSDialogProps> = ({ children, ...rest }) => {
  return (
    <Dialog fullWidth TransitionComponent={Transition} {...rest}>
      {children}
    </Dialog>
  );
};

export default POSDialog;
