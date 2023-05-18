import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { POSTextField, POSTextFieldProps } from "../POSTextField";
export interface POSPassFieldProps extends POSTextFieldProps {}

const POSPassField: React.FC<POSPassFieldProps> = ({
  keyFormik,
  label,
  formik,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	}
	
  return (
    <POSTextField
      keyFormik={keyFormik}
      label={label}
      formik={formik}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" style={{ marginBottom: "10px" }}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
			{...rest}
    />
  );
};

export default POSPassField;
