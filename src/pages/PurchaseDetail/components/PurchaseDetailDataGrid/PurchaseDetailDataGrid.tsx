import { POSDataGrid } from "common/components";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { PurchaseDetailDTO } from "common/dtos";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePurchaseDetailContext } from "../../context";
import { useColumnsPurchaseDetail } from "./custom-hooks";

export type PurchaseDetailDataGridProps = {};

const PurchaseDetailDataGrid: React.FC<PurchaseDetailDataGridProps> = () => {
  const { isGridLoading, setIsGridLoading, idSelected, setIdSelected, purchaseId } = usePurchaseDetailContext();
  const { getAll, remove } = useAxios("PurchaseDetails");
  const { resetResponse, response } = useDialogConfirm();
  const { columns } = useColumnsPurchaseDetail();
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetailDTO[]>([]);

  const getPurchaseDetails = async () => {
    const result = await getAll<PurchaseDetailDTO>(`GetPurchaseDetails/${purchaseId}`);
    setPurchaseDetails(result);
    setIsGridLoading(false);
  };

  const handleRemove = async () => {
    const result = await remove(idSelected);

    if (!result.success) return;

    getPurchaseDetails();
  };

  useEffect(() => {
    if (!isGridLoading) return;

    getPurchaseDetails();
  }, [isGridLoading]);

  useEffect(() => {
    if (!response) {
      resetResponse();
      setIdSelected(0);
      return;
    }

    handleRemove();
    resetResponse();
  }, [response]);

  return <POSDataGrid columns={columns()} dataSource={purchaseDetails} />;
};

export default PurchaseDetailDataGrid;
