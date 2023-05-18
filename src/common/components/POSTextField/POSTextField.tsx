import { StandardTextFieldProps, TextField } from "@mui/material";
import React from "react";
export interface POSTextFieldProps extends StandardTextFieldProps {
  keyFormik: string;
  label: string;
  formik: any;
}

const POSTextField: React.FC<POSTextFieldProps> = ({
  keyFormik,
  label,
  formik,
  ...rest
}) => {
  return (
    <TextField
      id={keyFormik}
      label={label}
      variant="standard"
      fullWidth
      margin="normal"
      value={formik.values[keyFormik]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[keyFormik] && Boolean(formik.errors[keyFormik])}
      helperText={formik.touched[keyFormik] && formik.errors[keyFormik]}
      style={{marginTop: "0"}}
      color="secondary"
      {...rest}
    />
  );
};

export default POSTextField;
