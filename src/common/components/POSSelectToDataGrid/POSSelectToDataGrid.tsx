import { MenuItem, Select, SelectProps } from "@mui/material";
import { SelectDTO } from "common/dtos";
import React from "react";

export interface POSSelectToDataGridProps extends SelectProps {
  /**
   * Registros para las opciones de selección.
   */
  datas: SelectDTO[];
}

/**
 * Select personalizado para DataGrid.
 *
 * Este componente muestra un campo de selección utilizado un componente DataGrid.
 * Utiliza el componente `Select` de Material-UI y recibe una lista de opciones a través de la propiedad `datas`.
 * Se pueden proporcionar propiedades adicionales para personalizar el campo de selección.
 */
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
