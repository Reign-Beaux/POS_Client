import React from 'react';
import { useArticlesTypesContext } from '../../context';
import { Button } from '@mui/material';

export type ArticlesTypesActionButtonsProps = {
}

const ArticlesTypesActionButtons: React.FC<ArticlesTypesActionButtonsProps> = () => {
  const { setIsOpenDialog, setTitleDialog } = useArticlesTypesContext();

  const handleShowDialog = () => {
    setTitleDialog("Crear Tipo de Artículo");
    setIsOpenDialog(true);
  };

  return (
    <div style={{ textAlign: "end", marginBottom: "8px" }}>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "10px" }}
        onClick={handleShowDialog}
      >
        Agregar tipo de artículo
      </Button>
    </div>
  );
};

export default ArticlesTypesActionButtons;
