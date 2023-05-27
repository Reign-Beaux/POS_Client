import { Button } from '@mui/material';
import React from 'react';
import { usePurchasingProcessContext } from '../../context';

export type PurchasingProcessActionButtonsProps = {
}

const PurchasingProcessActionButtons: React.FC<PurchasingProcessActionButtonsProps> = () => {
  const { setIsOpenDialog, setTitleDialog } = usePurchasingProcessContext();

  const handleShowDialog = () => {
    setTitleDialog("Crear Orden de Compra");
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
        Agregar compra
      </Button>
    </div>
  );
};

export default PurchasingProcessActionButtons;
