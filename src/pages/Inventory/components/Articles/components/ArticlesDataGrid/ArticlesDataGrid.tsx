import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { POSDataGrid } from "common/components";
import { APIControllers } from "common/consts";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { ArticleDTO } from "common/dtos";
import React, { useEffect, useState } from "react";
import { useArticlesContext } from "../../context";

export type ArticlesDataGridProps = {};

const ArticlesDataGrid: React.FC<ArticlesDataGridProps> = () => {
  const {
    setIsOpenDialog,
    setTitleDialog,
    isGridLoading,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useArticlesContext();
  const { getAll, remove } = useAxios(APIControllers.ARTICLES);
  const { showDialogConfirm } = useDialogConfirm();
  const [articles, setArticles] = useState<ArticleDTO[]>([]);

  const getArticles = async () => {
    const result = await getAll<ArticleDTO>();
    setArticles(result);
    setIsGridLoading(false);
  };

  const handleShowDialogToUpdate = (id: number) => {
    setIdSelected(id);
    setTitleDialog("Actualizar artículo");
    setIsOpenDialog(true);
  };

  const handleRemove = async (id: number) => {
    const result = await remove(id);

    if (!result.success) return;

    getArticles();
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
      field: "articleTypeDescription",
      headerName: "Tipo de artículo",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "isActive",
      headerName: "Activo",
      flex: 1,
      minWidth: 150,
      editable: false,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Checkbox checked={params.row.isActive} disabled />
      ),
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
          <Tooltip title="Actualizar artículo">
            <IconButton
              aria-label="update-student"
              onClick={() => handleShowDialogToUpdate(params.row.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar artículo">
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

    getArticles();
  }, [isGridLoading]);

  return <POSDataGrid dataSource={articles} columns={columns} />;
};

export default ArticlesDataGrid;
