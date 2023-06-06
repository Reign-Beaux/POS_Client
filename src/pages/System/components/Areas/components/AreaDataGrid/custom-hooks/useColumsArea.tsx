import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useAreaContext } from "../../../context";
import { useDialogConfirm } from "@/common/custom-hooks";

const useColumnsArea = () => {
  const {
    setIsOpenDialog,
    setTitleDialog,
    setIdSelected,
  } = useAreaContext();
  const { showDialogConfirm } = useDialogConfirm();

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar área");
    setIsOpenDialog(true);
  };

  const handleShowConfirmDialog = (id: number) => {
    setIdSelected(id);
    showDialogConfirm("¿Desea eliminar el registro?");
  };

  const columns = (): GridColDef[] => {
    return [
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
                onClick={() => handleShowDialogToUpdate(params.row.id)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar área">
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
  }

  return { columns };
}

export default useColumnsArea;