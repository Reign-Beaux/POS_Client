import { POSDataGrid } from "common/components";
import { APIControllers } from "common/consts";
import { useAxios } from "common/custom-hooks";
import { EmployeeDTO } from "common/dtos";
import React, { useEffect, useState } from "react";
import { useEmployeesContext } from "../../context";
import { useColumnsEmployees } from "./custom-hooks";

export type EmployeesDataGridProps = {};

const EmployeesDataGrid: React.FC<EmployeesDataGridProps> = () => {
  const { isGridLoading, setIsGridLoading } = useEmployeesContext();
  const { getAll, remove } = useAxios(APIControllers.EMPLOYEES);
  const [employees, setEmployees] = useState<EmployeeDTO[]>([]);

  const getEmployees = async () => {
    const result = await getAll<EmployeeDTO>();
    setEmployees(result);
    setIsGridLoading(false);
  };

  const handleRemove = async (id: number) => {
    const result = await remove(id);

    if (!result.success) return;

    getEmployees();
  };

  const { columns } = useColumnsEmployees(handleRemove);

  useEffect(() => {
    if (!isGridLoading) return;

    getEmployees();
  }, [isGridLoading]);

  return <POSDataGrid dataSource={employees} columns={columns()} />;
};

export default EmployeesDataGrid;
