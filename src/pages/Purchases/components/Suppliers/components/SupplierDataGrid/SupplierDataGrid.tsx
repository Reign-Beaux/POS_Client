import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { POSDataGrid } from "common/components";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { SupplierDTO } from "common/dtos";
import React, { useEffect, useState } from "react";
import { useSupplierContext } from "../../context";

export type SupplierDataGridProps = {};

const SupplierDataGrid: React.FC<SupplierDataGridProps> = () => {
  const {
    setIsOpenDialog,
    setTitleDialog,
    isGridLoading,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useSupplierContext();
  const { getAll, remove } = useAxios("Suppliers");
  const { showDialogConfirm } = useDialogConfirm();
  const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);

  const getSuppliers = async () => {
    const result = await getAll<SupplierDTO>();
    setSuppliers(result);
    setIsGridLoading(false);
  };

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar área");
    setIsOpenDialog(true);
  };

  const handleRemove = async () => {
    const result = await remove(idSelected);

    if (!result.success) return;

    getSuppliers();
    setIdSelected(0);
  };

  const handleShowConfirmDialog = (id: number) => {
    setIdSelected(id);
    showDialogConfirm("¿Desea eliminar el registro?", handleRemove);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "paternalSurname",
      headerName: "Apellido paterno",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "maternalSurname",
      headerName: "Apellido materno",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "brandDescription",
      headerName: "Marca",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "rfc",
      headerName: "RFC",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Teléfono",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "cellphone",
      headerName: "Celular",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "observations",
      headerName: "Observaciones",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Correo electrónico",
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

    getSuppliers();
  }, [isGridLoading]);

  return <POSDataGrid dataSource={suppliers} columns={columns} />;
};

export default SupplierDataGrid;
