import { POSDataGrid } from "common/components";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { Area } from "common/models";
import React, { useEffect, useState } from "react";
import { useAreaContext } from "../../context";
import { useColumsArea } from "./custom-hooks";

export type AreaDataGridProps = {};

const AreaDataGrid: React.FC<AreaDataGridProps> = () => {
  const {
    isGridLoading,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useAreaContext();
  const { getAll, remove } = useAxios("Areas");
  const { resetResponse, response } = useDialogConfirm();
  const { columns } = useColumsArea();
  const [areas, setAreas] = useState<Area[]>([]);

  const getAreas = async () => {
    const result = await getAll<Area>();
    setAreas(result);
    setIsGridLoading(false);
  };

  const handleRemove = async () => {
    const result = await remove(idSelected);

    if (!result.success) return;

    getAreas();
  };


  useEffect(() => {
    if (!isGridLoading) return;

    getAreas();
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

  return <POSDataGrid dataSource={areas} columns={columns()} />;
};

export default AreaDataGrid;
