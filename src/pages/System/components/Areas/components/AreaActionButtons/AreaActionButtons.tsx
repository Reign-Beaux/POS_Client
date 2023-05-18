import { Button } from "@mui/material";
import React from "react";
import { useAreaContext } from "../../context";

export type AreaActionButtonsProps = {};

const AreaActionButtons: React.FC<AreaActionButtonsProps> = () => {
  const { setIsOpenDialog, setTitleDialog } = useAreaContext();

  const handleShowDialog = () => {
    setTitleDialog("Crear Área");
    setIsOpenDialog(true);
  };

  return (
    <div style={{ textAlign: "end", marginBottom: "8px" }}>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "10px" }}
        onClick={handleShowDialog}
      >
        Agregar área
      </Button>
    </div>
  );
};

export default AreaActionButtons;
