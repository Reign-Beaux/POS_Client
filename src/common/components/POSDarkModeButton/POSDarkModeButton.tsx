import { useAppSelector } from "@/redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButtonProps } from "@mui/material";
import React from "react";
import { POSIconButton } from "../POSIconButton";
import { useChangeTheme } from "./custom-hooks";
export interface POSDarkModeButtonProps extends IconButtonProps {}

/**
 * Botón de modo oscuro.
 *
 * Este componente muestra un botón de cambio de tema que permite alternar entre el modo oscuro y el modo claro.
 * Utiliza Material-UI para el icono y el botón IconButton.
 * También utiliza Redux para cambiar el estado del tema.
 */
const POSDarkModeButton: React.FC<POSDarkModeButtonProps> = ({ ...rest }) => {
  const { isDarkMode } = useAppSelector((store) => store.theme);
  const { changeTheme } = useChangeTheme();
  
  return (
    <POSIconButton
      tooltipText="Cambiar tema"
      onClick={changeTheme}
      {...rest}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </POSIconButton>
  );
};

export default POSDarkModeButton;
