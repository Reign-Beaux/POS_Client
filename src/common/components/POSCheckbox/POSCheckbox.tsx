import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import React from "react";

export interface POSCheckboxProps extends CheckboxProps {
  keyFormik: string;
  label: string;
  formik: any;
}

const POSCheckbox: React.FC<POSCheckboxProps> = ({ keyFormik, label, formik, ...rest }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={keyFormik}
          checked={formik.values[keyFormik]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          color="secondary"
          {...rest}
        />
      }
      label={label}
    />
  );
};

export default POSCheckbox;
