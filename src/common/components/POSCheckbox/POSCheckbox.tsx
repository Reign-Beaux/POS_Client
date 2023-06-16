import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import React from "react";

export interface POSCheckboxProps extends CheckboxProps {
  /**
   * La clave de formulario para el componente POSCheckbox.
   */
  keyFormik: string;
  /**
   * La etiqueta del componente POSCheckbox.
   */
  label: string;
  /**
   * El objeto formik para el componente POSCheckbox.
   */
  formik: any;
}

/**
 * Componente personalizado de checkbox.
 *
 * Este componente extiende el componente `Checkbox` de Material-UI y se utiliza en conjunción con
 * la biblioteca Formik para facilitar el manejo de formularios.
 */
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
