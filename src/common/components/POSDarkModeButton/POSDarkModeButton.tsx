import { POSReducer } from "@/redux";
import { setTheme } from "@/redux/slices";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButtonProps } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { POSIconButton } from "../POSIconButton";
export interface POSDarkModeButtonProps extends IconButtonProps {}

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
