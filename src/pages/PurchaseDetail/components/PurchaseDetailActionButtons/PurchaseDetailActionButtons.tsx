import React from "react";
import { usePurchaseDetailContext } from "../../context";
import { Box, Button, Grid, Paper, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type PurchaseDetailActionButtonsProps = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
