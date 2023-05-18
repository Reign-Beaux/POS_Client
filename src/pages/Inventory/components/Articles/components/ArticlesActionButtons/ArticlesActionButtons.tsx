import { Button } from '@mui/material';
import React from 'react';
import { useArticlesContext } from '../../context';

export type ArticlesActionButtonsProps = {
}

const ArticlesActionButtons: React.FC<ArticlesActionButtonsProps> = () => {
  const { setIsOpenDialog, setTitleDialog } = useArticlesContext();

  const handleShowDialog = () => {
    setTitleDialog("Crear artículo");
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
        Agregar artículo
      </Button>
    </div>
  );
};

export default ArticlesActionButtons;