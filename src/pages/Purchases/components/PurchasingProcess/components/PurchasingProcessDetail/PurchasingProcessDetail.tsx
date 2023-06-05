import { DialogContent } from "@mui/material";
import { POSDialog, POSDialogHeader } from "common/components";
import React from "react";
import { usePurchasingProcessContext } from "../../context";
import { PPDetailActionButtons, PPDetailDataGrid } from "./components";
import { PPDetailProvider } from "./context";

export type PurchasingProcessDetailProps = {};

const PurchasingProcessDetail: React.FC<PurchasingProcessDetailProps> = () => {
  const { isOpenDialogDetail, setIsOpenDialogDetail } = usePurchasingProcessContext();

  return (
    <POSDialog open={isOpenDialogDetail} fullScreen>
      <POSDialogHeader titleDialog={"Detalle de compras"} setIsOpenDialog={setIsOpenDialogDetail} />
      <DialogContent>
        <PPDetailProvider>
          <PPDetailActionButtons />
          <PPDetailDataGrid />
        </PPDetailProvider>
      </DialogContent>
    </POSDialog>
  );
};

export default PurchasingProcessDetail;
