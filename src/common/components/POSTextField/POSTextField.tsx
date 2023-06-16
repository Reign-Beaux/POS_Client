import { StandardTextFieldProps, TextField } from "@mui/material";
import React from "react";
export interface POSTextFieldProps extends StandardTextFieldProps {
  /**
   * Clave del campo en el objeto `formik` que representa el formulario.
   */
  keyFormik: string;
  
  /**
   * Ttiqueta del campo.
   */
  label: string;
  
  /**
   * Objeto `formik` que contiene los valores y funciones del formulario.
   */
  formik: any;
}

/**
 * Componente de campo de texto.
 *
 * Representa un campo de texto con validación y manejo de formularios utilizando la biblioteca `formik`.
 */
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
