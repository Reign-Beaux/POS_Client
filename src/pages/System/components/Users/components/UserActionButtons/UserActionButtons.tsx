import { Button } from "@mui/material";
import React from "react";
import { useUserContext } from "../../context";

export type UserActionButtonsProps = {};

const UserActionButtons: React.FC<UserActionButtonsProps> = () => {
  const { setIsOpenDialog, setTitleDialog } = useUserContext();

  const handleShowDialog = () => {
    setTitleDialog("Crear Usuario");
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
        Agregar usuario
      </Button>
    </div>
  );
};

export default UserActionButtons;
