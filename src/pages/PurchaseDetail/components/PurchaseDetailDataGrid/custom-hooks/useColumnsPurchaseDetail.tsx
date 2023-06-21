import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { usePurchaseDetailContext } from "../../../context";
import { useDialogConfirm } from "common/custom-hooks";

const useColumnsPurchaseDetail = () => {
  const { setIsOpenDialog, setTitleDialog, setIdSelected } = usePurchaseDetailContext();
  const { showDialogConfirm } = useDialogConfirm();

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar partida");
    setIsOpenDialog(true);
  };

  const handleShowConfirmDialog = (id: number) => {
    setIdSelected(id);
    showDialogConfirm("¿Desea eliminar el registro?");
  };

  const columns = (): GridColDef[] => {
    return [
      {
        field: "articleDescription",
        headerName: "Artículo",
        flex: 1,
        minWidth: 150,
        editable: false,
      },
      {
        field: "quantitySold",
        headerName: "Cantidad",
        flex: 1,
        minWidth: 150,
        editable: false,
        align: "right",
      },
      {
        field: "price",
        headerName: "Precio",
        flex: 1,
        minWidth: 150,
        editable: false,
        align: "right",
      },
      {
        field: "subtotal",
        headerName: "Subtotal",
        flex: 1,
        minWidth: 150,
        editable: false,
        align: "right",
      },
      {
        field: "taxes",
        headerName: "IVA",
        flex: 1,
        minWidth: 150,
        editable: false,
        align: "right",
      },
      {
        field: "total",
        headerName: "Total",
        flex: 1,
        minWidth: 150,
        editable: false,
        align: "right",
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
            <Tooltip title="Actualizar partida">
              <IconButton
                aria-label="update-student"
                onClick={() => handleShowDialogToUpdate(params.row.id)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar partida">
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
  };

  return { columns };
};

export default useColumnsPurchaseDetail;
