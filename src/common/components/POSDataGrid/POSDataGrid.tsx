import { useTheme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { StyleDataGrid } from "./styled-components";

export interface POSDataGridProps {
  /**
   * Registros a mostrar en el DataGrid.
   */
  dataSource: any[];
  /**
   * Configuración de columnas a mostrar en el DataGrid.
   */
  columns: GridColDef[];
}

/**
 * DataGrid personalizado.
 *
 * Este componente muestra un DataGrid personalizado utilizando la biblioteca Material-UI.
 * Se puede proporcionar una fuente de datos y una configuración de columnas para mostrar los datos en el DataGrid.
 * También se pueden aplicar opciones de estilo y configuración específicas.
 */
const POSDataGrid: React.FC<POSDataGridProps> = ({ dataSource, columns }) => {
  const theme = useTheme();
  const pageSizeOptions = [5, 10, 50];
  return (
    <StyleDataGrid
      rows={dataSource}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 50,
          },
        },
      }}
      pageSizeOptions={pageSizeOptions}
      disableRowSelectionOnClick
      autoHeight
      showColumnVerticalBorder
      showCellVerticalBorder
      getRowId={(row: any) => (row.id === 0 ? row.record : row.id)}
      localeText={{
        noRowsLabel: "No se ha encontrado ningún registro",
        MuiTablePagination: {
          labelDisplayedRows: ({ from, to, count }) => `${from} - ${to} de ${count}`,
          labelRowsPerPage: "Registros por páginas",
        },
      }}
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    />
  );
};

export default POSDataGrid;
