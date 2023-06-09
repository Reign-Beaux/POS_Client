import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { POSDataGrid } from "common/components";
import { APIControllers, PurchaseStatusTexts } from "common/consts";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { PurchaseDTO } from "common/dtos";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePurchasingProcessContext } from "../../context";

export type PurchasingProcessDataGridProps = {};

const PurchasingProcessDataGrid: React.FC<PurchasingProcessDataGridProps> = () => {
  const { setIsOpenDialog, setTitleDialog, isGridLoading, setIsGridLoading, setIdSelected } =
    usePurchasingProcessContext();
  const navigate = useNavigate();
  const { getAll, remove } = useAxios(APIControllers.PURCHASES);
  const { showDialogConfirm } = useDialogConfirm();
  const [purchases, setPurchases] = useState<PurchaseDTO[]>([]);

  const getPurchases = async () => {
    const result = await getAll<PurchaseDTO>();
    setPurchases(result);
    setIsGridLoading(false);
  };

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar compra");
    setIsOpenDialog(true);
  };

  const handleRemove = async (id: number) => {
    const result = await remove(id);

    if (!result.success) return;

    getPurchases();
  };

  const handleShowConfirmDialog = (id: number) =>
    showDialogConfirm("¿Desea eliminar el registro?", () => handleRemove(id));

  const handleShowDetail = (id: number) => navigate(`/purchases/${id}`);

  const columns: GridColDef[] = [
    {
      field: "supplierFullName",
      headerName: "Proveedor",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "taxes",
      headerName: "IVA",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "userFullName",
      headerName: "Comprador",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "status",
      headerName: "Estatus",
      flex: 1,
      minWidth: 150,
      editable: false,
      renderCell: (params: GridRenderCellParams) => <>{PurchaseStatusTexts[params.row.status]}</>,
    },
    {
      field: "actions",
      headerName: "",
      flex: 1,
      minWidth: 150,
      editable: false,
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Tooltip title="Actualizar compra">
            <IconButton
              aria-label="update-student"
              onClick={() => handleShowDialogToUpdate(params.row.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Detalle de compra">
            <IconButton aria-label="delete-subject" onClick={() => handleShowDetail(params.row.id)}>
              <PostAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar compra">
            <IconButton
              aria-label="delete-subject"
              onClick={() => handleShowConfirmDialog(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (!isGridLoading) return;

    getPurchases();
  }, [isGridLoading]);

  return <POSDataGrid dataSource={purchases} columns={columns} />;
};

export default PurchasingProcessDataGrid;
