import { POSReducer } from "@/redux";
import { setTheme } from "@/redux/slices";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButtonProps } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { POSIconButton } from "../POSIconButton";
export interface POSDarkModeButtonProps extends IconButtonProps {}

/**
 * Botón de modo oscuro.
 *
 * Este componente muestra un botón de cambio de tema que permite alternar entre el modo oscuro y el modo claro.
 * Utiliza Material-UI para el icono y el botón IconButton.
 * También utiliza Redux para cambiar el estado del tema.
 */
const POSDarkModeButton: React.FC<POSDarkModeButtonProps> = ({ ...rest }) => {
  const dispatcher = useDispatch();
  const { isDarkMode } = useSelector((store: POSReducer) => store.theme);

  return (
    <POSIconButton
      tooltipText="Cambiar tema"
      onClick={() =>
        dispatcher(
          setTheme({
            isDarkMode: !isDarkMode,
            theme: null,
          })
        )
      }
      {...rest}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </POSIconButton>
  );
};

export default POSDarkModeButton;
