import React from "react";
import { PurchasingProcessProvider } from "./context";
import {
  PurchasingProcessActionButtons,
  PurchasingProcessDataGrid,
  PurchasingProcessDetail,
  PurchasingProcessDialog,
} from "./components";

export type PurchasingProcessProps = {};

const PurchasingProcess: React.FC<PurchasingProcessProps> = () => {
  return (
    <PurchasingProcessProvider>
      <PurchasingProcessActionButtons />
      <PurchasingProcessDataGrid />
      <PurchasingProcessDialog />
      <PurchasingProcessDetail />
    </PurchasingProcessProvider>
  );
};

export default PurchasingProcess;
