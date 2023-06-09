import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { POSDataGrid } from "common/components";
import { APIControllers } from "common/consts";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { Brand } from "common/models";
import React, { useEffect, useState } from "react";
import { useBrandContext } from "../../context";

export type BrandDataGridProps = {};

const BrandDataGrid: React.FC<BrandDataGridProps> = () => {
  const {
    setIsOpenDialog,
    setTitleDialog,
    isGridLoading,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useBrandContext();
  const { getAll, remove } = useAxios(APIControllers.BRANDS);
  const { showDialogConfirm } = useDialogConfirm();
  const [brands, setBrands] = useState<Brand[]>([]);

  const getBrands = async () => {
    const result = await getAll<Brand>();
    setBrands(result);
    setIsGridLoading(false);
  };

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar área");
    setIsOpenDialog(true);
  };

  const handleRemove = async (id: number) => {
    const result = await remove(id);

    if (!result.success) return;

    getBrands();
  };

  const handleShowConfirmDialog = (id: number) =>
    showDialogConfirm("¿Desea eliminar el registro?", () => handleRemove(id));

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Código",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      minWidth: 150,
      editable: false,
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
          <Tooltip title="Actualizar área">
            <IconButton
              aria-label="update-student"
              onClick={() => handleShowDialogToUpdate(params.row.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar área">
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

    getBrands();
  }, [isGridLoading]);

  return <POSDataGrid dataSource={brands} columns={columns} />;
};

export default BrandDataGrid;
