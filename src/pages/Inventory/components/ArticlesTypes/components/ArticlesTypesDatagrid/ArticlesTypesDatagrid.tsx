import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { POSDataGrid } from "common/components";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { ArticleType } from "common/models";
import React, { useEffect, useState } from "react";
import { useArticlesTypesContext } from "../../context";

export type ArticlesTypesDatagridProps = {};

const ArticlesTypesDatagrid: React.FC<ArticlesTypesDatagridProps> = () => {
  const {
    setIsOpenDialog,
    setTitleDialog,
    isGridLoading,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useArticlesTypesContext();
  const { getAll, remove } = useAxios("ArticlesTypes");
  const { showDialogConfirm } = useDialogConfirm();
  const [articlesTypes, setArticlesTypes] = useState<ArticleType[]>([]);

  const getArticlesTypes = async () => {
    const result = await getAll<ArticleType>();
    setArticlesTypes(result);
    setIsGridLoading(false);
  };

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar tipo de artículo");
    setIsOpenDialog(true);
  };

  const handleRemove = async (id: number) => {
    const result = await remove(id);

    if (!result.success) return;

    getArticlesTypes();
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
          <Tooltip title="Actualizar tipo de artículo">
            <IconButton
              aria-label="update-student"
              onClick={() => handleShowDialogToUpdate(params.row.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar tipo de artículo">
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

    getArticlesTypes();
  }, [isGridLoading]);

  return <POSDataGrid dataSource={articlesTypes} columns={columns} />;
};

export default ArticlesTypesDatagrid;
