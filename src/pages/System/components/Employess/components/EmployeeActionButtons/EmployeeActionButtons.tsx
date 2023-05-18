import { Button } from "@mui/material";
import React from "react";
import { useEmployeesContext } from "../../context";

export interface EmployeeActionButtonsProps {}

const EmployeeActionButtons: React.FC<EmployeeActionButtonsProps> = () => {
  const { setIsOpenDialog, setTitleDialog } = useEmployeesContext();

  const handleShowDialog = () => {
    setTitleDialog("Crear empleado");
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
        Agregar empleado
      </Button>
    </div>
  );
};

export default EmployeeActionButtons;
