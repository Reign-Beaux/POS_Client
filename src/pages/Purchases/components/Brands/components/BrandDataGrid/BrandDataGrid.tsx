import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { POSDataGrid } from 'common/components';
import { useAxios, useDialogConfirm } from 'common/custom-hooks';
import { Brand } from 'common/models';
import React, { useEffect, useState } from 'react';
import { useBrandContext } from '../../context';

export type BrandDataGridProps = {
}

const BrandDataGrid: React.FC<BrandDataGridProps> = () => {
  const {
    setIsOpenDialog,
    setTitleDialog,
    isGridLoading,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useBrandContext();
  const { getAll, remove } = useAxios("Brands");
  const { showDialogConfirm, resetResponse, response } = useDialogConfirm();
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

  const handleRemove = async () => {
    const result = await remove(idSelected);

    if (!result.success) return;

    getBrands();
  };

  const handleShowConfirmDialog = (id: number) => {
    setIdSelected(id);
    showDialogConfirm("¿Desea eliminar el registro?");
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

  useEffect(() => {
    if (!isGridLoading) return;

    getBrands();
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
  
  return <POSDataGrid dataSource={brands} columns={columns} />;
};

export default BrandDataGrid;
