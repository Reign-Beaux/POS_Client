import React from "react";
import { EmployeeActionButtons, EmployeeDialog, EmployeesDataGrid } from "./components";
import { EmployeeProvider } from "./context";

export interface EmployessProps {}

const Employess: React.FC<EmployessProps> = () => {
  return (
    <EmployeeProvider>
      <EmployeeActionButtons />
      <EmployeesDataGrid />
      <EmployeeDialog />
    </EmployeeProvider>
  );
};

export default Employess;
