import { POSReducer } from "@/redux";
import { resetConfirm, setResponse } from "@/redux/slices";
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
import { useDispatch, useSelector } from "react-redux";
import { POSButton } from "../POSButton";

export type POSConfirmationDialogProps = {};

const POSConfirmationDialog: React.FC<POSConfirmationDialogProps> = () => {
  const dispatcher = useDispatch();
  const { isOpen, message } = useSelector((store: POSReducer) => store.confirm);
  const handleResult = async (result: boolean) => {
    dispatcher(setResponse(result));
  };

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle sx={{ display: "flex" }}>
        <div style={{ flex: "50%" }}>¿Estás seguro?</div>
        <div style={{ flex: "50%", textAlign: "end" }}>
          <Tooltip title="Cerrar">
            <IconButton aria-label="logOut" onClick={() => handleResult(false)}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <POSButton onClick={() => handleResult(true)}>
          <CheckIcon /> Aceptar
        </POSButton>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginTop: "15px", width: "150px" }}
          onClick={() => handleResult(false)}
        >
          <CloseIcon /> Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default POSConfirmationDialog;
