import { Button } from '@mui/material';
import React from 'react';
import { useSupplierContext } from '../../context';

export type SupplierActionButtonsProps = {
}

const SupplierActionButtons: React.FC<SupplierActionButtonsProps> = () => {
  const { setIsOpenDialog, setTitleDialog } = useSupplierContext();

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
        Agregar proveedor
      </Button>
    </div>
  );
};

export default SupplierActionButtons;
