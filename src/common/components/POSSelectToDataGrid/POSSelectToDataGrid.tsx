import { MenuItem, Select, SelectProps } from "@mui/material";
import { SelectDTO } from "common/dtos";
import React from "react";

export interface POSSelectToDataGridProps extends SelectProps {
  datas: SelectDTO[];
}

const POSSelectToDataGrid: React.FC<POSSelectToDataGridProps> = ({ datas, ...rest }) => {
  return (
    <Select labelId="select-label" variant="standard" fullWidth {...rest}>
      {datas.map((data) => (
        <MenuItem key={data.value} value={data.value}>
          {data.text}
        </MenuItem>
      ))}
    </Select>
  );
};

export default POSSelectToDataGrid;
