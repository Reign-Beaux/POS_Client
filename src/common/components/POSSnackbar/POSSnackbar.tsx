import { useAppSelector } from "@/redux";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import { useCloseSnackbar } from "./custom-hooks";
export interface POSSnackbarProps {}

/**
 * Snackbar personalizado.
 *
 * Este componente muestra una notificación, utiliza el componente `Snackbar` de Material-UI y se comunica con el estado global de Redux para obtener los datos de la notificación.
 * Se cierra automáticamente después de un tiempo determinado y puede ser cerrado manualmente por el usuario.
 */
const POSSnackbar: React.FC<POSSnackbarProps> = () => {
  const { isOpen, severity, message } = useAppSelector((store) => store.snackbar);
  const { closeSnackbar } = useCloseSnackbar();

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isOpen}
      autoHideDuration={5000}
      onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default POSSnackbar;
