import { Button } from "@mui/material";
import React from "react";
import { useBrandContext } from "../../context";

export type BrandActionButtonsProps = {};

const BrandActionButtons: React.FC<BrandActionButtonsProps> = () => {
  const { setIsOpenDialog, setTitleDialog } = useBrandContext();

  const handleShowDialog = () => {
    setTitleDialog("Crear Marca");
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

export default BrandActionButtons;
