import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { StyleDataGrid } from "./styled-components";
import { useTheme } from "@mui/material";

export interface POSDataGridProps {
  dataSource: any[];
  columns: GridColDef[];
}

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
      getRowId={(row: any) => row.id}
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
