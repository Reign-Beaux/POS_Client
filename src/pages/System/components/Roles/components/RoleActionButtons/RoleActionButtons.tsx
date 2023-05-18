import React from "react";
import { Button } from "@mui/material";
import { useRoleContext } from "../../../Roles/context";

export type RoleActionButtonsProps = {};

const RoleActionButtons: React.FC<RoleActionButtonsProps> = () => {
  const { setIsOpenDialog, setTitleDialog } = useRoleContext();

  const handleShowDialog = () => {
    setTitleDialog("Crear Rol");
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
        Agregar rol
      </Button>
    </div>
  );
};

export default RoleActionButtons;
