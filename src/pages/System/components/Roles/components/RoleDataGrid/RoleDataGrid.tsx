import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { POSDataGrid } from "common/components";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { Role } from "common/models";
import React, { useEffect, useState } from "react";
import { useRoleContext } from "../../context";

export type RoleDataGridProps = {};

const RoleDataGrid: React.FC<RoleDataGridProps> = () => {
  const {
    setIsOpenDialog,
    setIsOpenDialogFeatures,
    setTitleDialog,
    isGridLoading,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useRoleContext();
  const { getAll, remove } = useAxios("Roles");
  const { showDialogConfirm } = useDialogConfirm();
  const [roles, setRoles] = useState<Role[]>([]);

  const getRoles = async () => {
    const result = await getAll<Role>();
    setRoles(result);
    setIsGridLoading(false);
  };

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar rol");
    setIsOpenDialog(true);
  };

  const handleShowDialogToAssignFeatures = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Lista de funcionalidades");
    setIsOpenDialogFeatures(true);
  };

  const handleRemove = async () => {
    const result = await remove(idSelected);

    if (!result.success) return;

    getRoles();
    setIdSelected(0);
  };

  const handleShowConfirmDialog = (id: number) => {
    setIdSelected(id);
    showDialogConfirm("¿Desea eliminar el registro?", handleRemove);
  };

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
          <Tooltip title="Actualizar rol">
            <IconButton
              aria-label="update-role"
              onClick={() => handleShowDialogToUpdate(params.row.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Asignar funcionalidades">
            <IconButton
              aria-label="assign-functionalities"
              onClick={() => handleShowDialogToAssignFeatures(params.row.id)}>
              <PlaylistAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar rol">
            <IconButton
              aria-label="delete-role"
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

    getRoles();
  }, [isGridLoading]);

  return <POSDataGrid dataSource={roles} columns={columns} />;
};

export default RoleDataGrid;
