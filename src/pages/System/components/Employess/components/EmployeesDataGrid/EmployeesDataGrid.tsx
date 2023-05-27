import { EmployeeDTO } from "common/dtos";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { POSDataGrid } from "common/components";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import React, { useEffect, useState } from "react";
import { useEmployeesContext } from "../../context";

export type EmployeesDataGridProps = {};

const EmployeesDataGrid: React.FC<EmployeesDataGridProps> = () => {
  const {
    setIsOpenDialog,
    setTitleDialog,
    isGridLoading,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useEmployeesContext();
  const { getAll, remove } = useAxios("Employees");
  const { showDialogConfirm, resetResponse, response } = useDialogConfirm();
  const [employees, setEmployees] = useState<EmployeeDTO[]>([]);

  const getEmployees = async () => {
    const result = await getAll<EmployeeDTO>();
    setEmployees(result);
    setIsGridLoading(false);
  };

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar empleado");
    setIsOpenDialog(true);
  };

  const handleRemove = async () => {
    const result = await remove(idSelected);

    if (!result.success) return;

    getEmployees();
  };

  const handleShowConfirmDialog = (id: number) => {
    setIdSelected(id);
    showDialogConfirm("¿Desea eliminar el registro?");
  };

  const columns: GridColDef[] = [
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
      field: "areaDescription",
      headerName: "Área",
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
          <Tooltip title="Actualizar empleado">
            <IconButton
              aria-label="update-student"
              onClick={() => handleShowDialogToUpdate(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar empleado">
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

    getEmployees();
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
  
  return <POSDataGrid dataSource={employees} columns={columns} />;
};

export default EmployeesDataGrid;
