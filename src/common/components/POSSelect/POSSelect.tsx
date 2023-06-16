import { FormControl, FormHelperText, InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { SelectDTO } from "common/dtos";
import React from "react";

export interface POSSelectProps {
  /**
   * Clave asociada al campo de selección en el objeto Formik.
   */
  keyFormik: string;
  /**
   * Etiqueta del campo de selección.
   */
  label: string;
  /**
   * Objeto Formik asociado al campo de selección.
   */
  formik: any;
  /**
   * Registros para las opciones de selección.
   */
  datas: SelectDTO[];
}

/**
 * Select personalizado.
 *
 * Este componente muestra un campo de selección utilizando el componente `Select` de Material-UI.
 * Permite seleccionar una opción de una lista de opciones proporcionadas en la propiedad `datas`.
 * Se pueden proporcionar propiedades adicionales para personalizar el campo de selección.
 */
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
