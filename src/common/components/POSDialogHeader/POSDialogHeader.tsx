import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Toolbar, IconButton, Typography, Button, Tooltip } from "@mui/material";
import React from "react";

export type POSDialogHeaderProps = {
  /**
   * El título del dialog.
   */
  titleDialog: string;
  /**
   * Función para establecer si el dialog está abierto o cerrado.
   */
  setIsOpenDialog: Function;
};

/**
 * Encabezado del diálogo.
 *
 * Este componente muestra el encabezado de un dialog, se pueden proporcionar un título y una función
 * para controlar el estado del diálogo.
 */
const POSDialogHeader: React.FC<POSDialogHeaderProps> = ({ titleDialog, setIsOpenDialog }) => {
  return (
    <AppBar sx={{ position: "relative" }}>
      <Toolbar sx={{ display: "flex" }}>
        <div style={{ flex: "50%" }}>
          <Typography sx={{ ml: 2, flex: 1, color: "white" }} variant="h6" component="div">
            {titleDialog}
          </Typography>
        </div>
        <div style={{ flex: "50%", textAlign: "end", color: "white" }}>
          <Tooltip title="Cerrar">
            <IconButton aria-label="logOut" onClick={() => setIsOpenDialog(false)} style={{ color: "white" }} >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default POSDialogHeader;
