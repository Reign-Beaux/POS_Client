import { Button } from "@mui/material";
import { purchaseDetailEmpty } from "common/models";
import React, { useEffect } from "react";
import { usePPDetailContext } from "../../context";
import { useAxios } from "@/common/custom-hooks";

export type PPDetailActionButtonsProps = {};

const PPDetailActionButtons: React.FC<PPDetailActionButtonsProps> = () => {
  const { post } = useAxios("Areas");
  const { purchaseDetail, setPurchaseDetail } = usePPDetailContext();

  const handleAddPurchaseDetail = () => {
    let newRecord = { ...purchaseDetailEmpty };
    newRecord.record = purchaseDetail.length + 1;
    setPurchaseDetail([...purchaseDetail, newRecord]);
  };

  const handleSavePurchaseDetail = () => {

  };

  return (
    <div style={{ textAlign: "end", marginBottom: "8px" }}>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "10px" }}
        onClick={handleAddPurchaseDetail}>
        Agregar partida
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "10px" }}
        onClick={handleSavePurchaseDetail}>
        Guardar Detalle
      </Button>
    </div>
  );
};

export default PPDetailActionButtons;
