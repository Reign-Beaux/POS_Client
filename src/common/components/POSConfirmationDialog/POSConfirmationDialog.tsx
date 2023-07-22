import { useAppSelector } from "@/redux";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { POSButton } from "../POSButton";
import { useSetResult } from "./custom-hooks";

export type POSConfirmationDialogProps = {};

/**
 * Componente de dialog de confirmación.
 *
 * Este componente muestra un dialog de confirmación con un mensaje personalizado y botones de aceptar y cancelar.
 */
const POSConfirmationDialog: React.FC<POSConfirmationDialogProps> = () => {
  const { setResult } = useSetResult();
  const { isOpen, message } = useAppSelector((store) => store.confirm);

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle sx={{ display: "flex" }}>
        <div style={{ flex: "50%" }}>¿Estás seguro?</div>
        <div style={{ flex: "50%", textAlign: "end" }}>
          <Tooltip title="Cerrar">
            <IconButton aria-label="logOut" onClick={() => setResult(false)}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <POSButton onClick={() => setResult(true)}>
          <CheckIcon /> Aceptar
        </POSButton>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginTop: "15px", width: "150px" }}
          onClick={() => setResult(false)}>
          <CloseIcon /> Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default POSConfirmationDialog;
