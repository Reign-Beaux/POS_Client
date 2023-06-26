import { POSDataGrid } from "common/components";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { PurchaseDetailDTO } from "common/dtos";
import React, { useEffect, useState } from "react";
import { usePurchaseDetailContext } from "../../context";
import { useColumnsPurchaseDetail } from "./custom-hooks";

export type PurchaseDetailDataGridProps = {};

const PurchaseDetailDataGrid: React.FC<PurchaseDetailDataGridProps> = () => {
  const { isGridLoading, setIsGridLoading, idSelected, setIdSelected, purchaseId } =
    usePurchaseDetailContext();
  const { getAll, remove } = useAxios("PurchaseDetails");
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetailDTO[]>([]);

  const getPurchaseDetails = async () => {
    const result = await getAll<PurchaseDetailDTO>(`GetPurchaseDetails/${purchaseId}`);
    setPurchaseDetails(result);
    setIsGridLoading(false);
  };

  const handleRemove = async (id: number) => {
    const result = await remove(id);

    if (!result.success) return;

    getPurchaseDetails();
  };

  const { columns } = useColumnsPurchaseDetail(handleRemove);

  useEffect(() => {
    if (!isGridLoading) return;

    getPurchaseDetails();
  }, [isGridLoading]);

  return <POSDataGrid columns={columns()} dataSource={purchaseDetails} />;
};

export default PurchaseDetailDataGrid;
