import { Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePurchaseDetailContext } from "../../context";

export type PurchaseDetailActionButtonsProps = {};

const PurchaseDetailActionButtons: React.FC<PurchaseDetailActionButtonsProps> = () => {
  const navigate = useNavigate();
  const { setIsOpenDialog, setTitleDialog } = usePurchaseDetailContext();

  const returnPurchase = () => navigate(`/purchases`);

  const handleShowDialog = () => {
    setTitleDialog("Agregar partida");
    setIsOpenDialog(true);
  };

  return (
    <Grid container spacing={1} style={{ marginBottom: "8px" }}>
      <Grid item xs={2}>
        <Button variant="contained" color="secondary" onClick={returnPurchase}>
          Atrás
        </Button>
      </Grid>
      <Grid item xs={10}>
        <div style={{ textAlign: "end" }}>
          <Button variant="contained" color="secondary" onClick={handleShowDialog}>
            Agregar partida
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default PurchaseDetailActionButtons;
