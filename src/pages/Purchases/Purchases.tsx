import { POSTabPanel, POSTabs } from "common/components";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Brands, PurchaseReception, PurchasingProcess, Suppliers } from "./components";
export interface PurchasesProps {}

const Purchases: React.FC<PurchasesProps> = () => {
  const [value, setValue] = useState<number>(0);

  const tabsName: string[] = ["Compras", "Proveedores", "Marcas", "Recepción de compras"];

  return (
    <Box
      id="box-purchases"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <POSTabs value={value} setValue={setValue} tabsName={tabsName} />
      <POSTabPanel value={value} index={0}>
        <PurchasingProcess />
      </POSTabPanel>
      <POSTabPanel value={value} index={1}>
        <Suppliers />
      </POSTabPanel>
      <POSTabPanel value={value} index={2}>
        <Brands />
      </POSTabPanel>
      <POSTabPanel value={value} index={3}>
        <PurchaseReception />
      </POSTabPanel>
    </Box>
  );
};

export default Purchases;
