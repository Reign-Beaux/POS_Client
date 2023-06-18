import React from "react";
import { PurchaseDetailProvider } from "./context";
import {
  PurchaseDetailActionButtons,
  PurchaseDetailDataGrid,
  PurchaseDetailDialog,
} from "./components";

export type PurchaseDetailProps = {};

const PurchaseDetail: React.FC<PurchaseDetailProps> = () => {
  return (
    <PurchaseDetailProvider>
      <PurchaseDetailActionButtons />
      <PurchaseDetailDataGrid />
      <PurchaseDetailDialog />
    </PurchaseDetailProvider>
  );
};

export default PurchaseDetail;
