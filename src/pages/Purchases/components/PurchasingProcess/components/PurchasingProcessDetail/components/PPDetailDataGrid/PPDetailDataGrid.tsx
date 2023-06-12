import { POSDataGrid } from "common/components";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { PurchaseDTO } from "common/dtos";
import React, { useState } from "react";
import { usePPDetailContext } from "../../context";
import { useColumnsPPDetail } from "./custom-hooks";

export type PPDetailDataGridProps = {};

const PPDetailDataGrid: React.FC<PPDetailDataGridProps> = () => {
  const { purchaseDetail } = usePPDetailContext();
  const { getAll, remove } = useAxios("Purchases");
  const { showDialogConfirm, resetResponse, response } = useDialogConfirm();
  const { columns } = useColumnsPPDetail();
  
  const [Purchases, setPurchases] = useState<PurchaseDTO[]>([]);

  return <POSDataGrid dataSource={purchaseDetail} columns={columns()} />;
};

export default PPDetailDataGrid;