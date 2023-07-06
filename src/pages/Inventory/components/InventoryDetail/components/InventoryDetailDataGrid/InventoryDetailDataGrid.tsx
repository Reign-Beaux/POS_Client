import { GridColDef } from "@mui/x-data-grid";
import { POSDataGrid } from "common/components";
import { APIControllers } from "common/consts";
import { useAxios } from "common/custom-hooks";
import { InventoryDTO } from "common/dtos";
import React, { useEffect, useState } from "react";

export type InventoryDetailDataGridProps = {};

const InventoryDetailDataGrid: React.FC<InventoryDetailDataGridProps> = () => {
  const { getAll } = useAxios(APIControllers.INVENTORIES);
  const [inventory, setInventory] = useState<InventoryDTO[]>([]);

  const getInventoryDetail = async () => {
    const result = await getAll<InventoryDTO>();
    setInventory(result);
  };

  useEffect(() => {
    getInventoryDetail();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "articleDescription",
      headerName: "Artículo",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "quantityInStock",
      headerName: "Cantidad en stock",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
  ];

  return <POSDataGrid dataSource={inventory} columns={columns} />;
};

export default InventoryDetailDataGrid;
