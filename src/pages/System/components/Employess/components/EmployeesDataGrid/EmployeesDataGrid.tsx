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
  const { resetResponse, response } = useDialogConfirm();
  const { columns } = useColumnsEmployees();
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
  };

  useEffect(() => {
    if (!isGridLoading) return;

    getEmployees();
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
  
  return <POSDataGrid dataSource={employees} columns={columns()} />;
};

export default EmployeesDataGrid;
