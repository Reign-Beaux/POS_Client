import { UserDTO } from "common/dtos";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { POSDataGrid } from "common/components";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context";

export type UserDataGridProps = {};

const UserDataGrid: React.FC<UserDataGridProps> = () => {
  const {
    setIsOpenDialog,
    setTitleDialog,
    isGridLoading,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useUserContext();
  const { getAll, remove } = useAxios("Users");
  const { showDialogConfirm } = useDialogConfirm();
  const [users, setUsers] = useState<UserDTO[]>([]);

  const getUsers = async () => {
    const result = await getAll<UserDTO>();
    setUsers(result);
    setIsGridLoading(false);
  };

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar usuario");
    setIsOpenDialog(true);
  };

  const handleRemove = async () => {
    const result = await remove(idSelected);

    if (!result.success) return;

    getUsers();
    setIdSelected(0);
  };

  const handleShowConfirmDialog = (id: number) => {
    setIdSelected(id);
    showDialogConfirm("¿Desea eliminar el registro?", handleRemove);
  };
	
  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Usuario",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "name",
      headerName: "Nombre(s)",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "paternalSurname",
      headerName: "Apellido Paterno",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "maternalSurname",
      headerName: "Apellido Materno",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "roleDescription",
      headerName: "Rol",
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
          <Tooltip title="Actualizar usuario">
            <IconButton
              aria-label="update-student"
              onClick={() => handleShowDialogToUpdate(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar usuario">
            <IconButton
              aria-label="delete-subject"
              onClick={() => handleShowConfirmDialog(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (!isGridLoading) return;

    getUsers();
  }, [isGridLoading]);

  return <POSDataGrid dataSource={users} columns={columns} />;
};

export default UserDataGrid;
