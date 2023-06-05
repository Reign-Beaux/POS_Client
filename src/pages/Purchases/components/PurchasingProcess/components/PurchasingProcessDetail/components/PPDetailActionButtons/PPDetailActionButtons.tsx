import { Button } from "@mui/material";
import { purchaseDetailEmpty } from "common/models";
import React, { useEffect } from "react";
import { usePPDetailContext } from "../../context";

export type PPDetailActionButtonsProps = {};

const PPDetailActionButtons: React.FC<PPDetailActionButtonsProps> = () => {
  const { purchaseDetail, setPurchaseDetail } = usePPDetailContext();

  const handleAddPurchaseDetail = () => {
    let newRecord = {...purchaseDetailEmpty};
    newRecord.record = purchaseDetail.length + 1;
    setPurchaseDetail([...purchaseDetail, newRecord]);
  }

  return (
    <div style={{ textAlign: "end", marginBottom: "8px" }}>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "10px" }}
        onClick={handleAddPurchaseDetail}>
        Agregar partida
      </Button>
    </div>
  );
};

export default PPDetailActionButtons;
