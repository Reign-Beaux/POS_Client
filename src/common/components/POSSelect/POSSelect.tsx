import { FormControl, FormHelperText, InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { SelectDTO } from "common/dtos";
import React from "react";

export interface POSSelectProps {
  keyFormik: string;
  label: string;
  formik: any;
  datas: SelectDTO[];
}

const POSSelect: React.FC<POSSelectProps> = ({ keyFormik, label, formik, datas }) => {
  return (
    <FormControl
      fullWidth
      error={formik.touched[keyFormik] && Boolean(formik.errors[keyFormik])}
      sx={{ marginTop: "10px" }}
    >
      <InputLabel id="pos-select-label">{label}</InputLabel>
      <Select
        id={keyFormik}
        name={keyFormik}
        labelId="pos-select-label"
        variant="standard"
        value={formik.values[keyFormik] === 0 ? "" : formik.values[keyFormik]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {datas.map((data) => (
          <MenuItem key={data.value} value={data.value}>
            {data.text}
          </MenuItem>
        ))}
      </Select>
      {formik.touched[keyFormik] && Boolean(formik.errors[keyFormik]) && (
        <FormHelperText>{formik.errors[keyFormik]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default POSSelect;
