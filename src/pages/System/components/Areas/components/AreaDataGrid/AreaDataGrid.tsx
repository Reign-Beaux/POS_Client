import { POSDataGrid } from "common/components";
import { APIControllers } from "common/consts";
import { useAxios } from "common/custom-hooks";
import { Area } from "common/models";
import React, { useEffect, useState } from "react";
import { useAreaContext } from "../../context";
import { useColumsArea } from "./custom-hooks";

export type AreaDataGridProps = {};

const AreaDataGrid: React.FC<AreaDataGridProps> = () => {
  const { isGridLoading, setIsGridLoading } = useAreaContext();
  const { getAll, remove } = useAxios(APIControllers.AREAS);
  const [areas, setAreas] = useState<Area[]>([]);

  const getAreas = async () => {
    const result = await getAll<Area>();
    setAreas(result);
    setIsGridLoading(false);
  };

  const handleRemove = async (id: number) => {
    const result = await remove(id);

    if (!result.success) return;

    getAreas();
  };

  const { columns } = useColumsArea(handleRemove);

  useEffect(() => {
    if (!isGridLoading) return;

    getAreas();
  }, [isGridLoading]);

  return <POSDataGrid dataSource={areas} columns={columns()} />;
};

export default AreaDataGrid;
