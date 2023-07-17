import { APIControllers } from "common/consts";
import { useAxios } from "common/custom-hooks";
import { PurchaseDTO } from "common/dtos";
import React, { useState } from "react";
import { useColumnsPurchaseReception } from "./custom-hooks";

export interface PRDataGridProps {}

const PRDataGrid: React.FC<PRDataGridProps> = ({}) => {
  const { getAll } = useAxios(APIControllers.PURCHASES);
	const { columns } = useColumnsPurchaseReception();
  const [isGridLoading, setIsGridLoading] = useState<boolean>(false);
  const [purchases, setPurchases] = useState<PurchaseDTO[]>([]);

  const getPurchases = async () => {
    const result = await getAll<PurchaseDTO>();
    setPurchases(result);
    setIsGridLoading(false);  
  };



  return <div>PRDataGrid</div>;
};

export default PRDataGrid;
