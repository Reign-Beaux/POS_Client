import { POSReducer } from "@/redux";
import { getTheme } from "@/themes";
import { Theme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  const { isDarkMode } = useSelector((store: POSReducer) => store.theme);
  const [theme, setTheme] = useState<Theme>(getTheme(isDarkMode))
  // const theme: Theme = useSelector((store: POSReducer) => (createTheme(store.theme.theme)));

  useEffect(() => {
    setTheme(getTheme(isDarkMode));
  }, [isDarkMode]);
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
