import { POSDataGrid } from "common/components";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { EmployeeDTO } from "common/dtos";
import React, { useEffect, useState } from "react";
import { useEmployeesContext } from "../../context";
import { useColumnsEmployees } from "./custom-hooks";

export type EmployeesDataGridProps = {};

const EmployeesDataGrid: React.FC<EmployeesDataGridProps> = () => {
  const {
    isGridLoading,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useEmployeesContext();
  const { getAll, remove } = useAxios("Employees");
  const [employees, setEmployees] = useState<EmployeeDTO[]>([]);

  const getEmployees = async () => {
    const result = await getAll<EmployeeDTO>();
    setEmployees(result);
    setIsGridLoading(false);
  };

  const handleRemove = async () => {
    const result = await remove(idSelected);

    if (!result.success) return;

    getEmployees();
    setIdSelected(0);
  };

  const { columns } = useColumnsEmployees(handleRemove);

  useEffect(() => {
    if (!isGridLoading) return;

    getEmployees();
  }, [isGridLoading]);
  
  return <POSDataGrid dataSource={employees} columns={columns()} />;
};

export default EmployeesDataGrid;
