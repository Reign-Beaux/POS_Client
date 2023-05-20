import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const StyleDataGrid = styled(DataGrid)`
  width: 100%;
  .MuiDataGrid-cell:focus-within {
    outline: none;
  }
  .MuiDataGrid-columnHeader:focus-within {
    outline: none;
  }
`;
