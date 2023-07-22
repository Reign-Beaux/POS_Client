import { useAppSelector } from "@/redux";
import { getTheme } from "@/themes";
import { Theme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  const { isDarkMode } = useAppSelector((store) => store.theme);
  const [theme, setTheme] = useState<Theme>(getTheme(isDarkMode))

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
