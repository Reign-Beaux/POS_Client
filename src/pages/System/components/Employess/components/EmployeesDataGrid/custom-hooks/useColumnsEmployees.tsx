import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useDialogConfirm } from "common/custom-hooks";
import { useEmployeesContext } from "../../../context";

const useColumnsEmployees = (handleRemove: Function) => {
  const {
    setIsOpenDialog,
    setTitleDialog,
    setIdSelected,
  } = useEmployeesContext();
  const { showDialogConfirm } = useDialogConfirm();

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar empleado");
    setIsOpenDialog(true);
  };

  const handleShowConfirmDialog = (id: number) =>
    showDialogConfirm("¿Desea eliminar el registro?", () => handleRemove(id));

  const columns = (): GridColDef[] => {
    return [
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
                onClick={() => handleShowDialogToUpdate(params.row.id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar empleado">
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
  };

  return { columns };
};

export default useColumnsEmployees;
