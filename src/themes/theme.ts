import { createTheme, ThemeOptions } from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "rgba(0, 0, 0, 0.1)",
      contrastText: "#1a2027",
    },
    secondary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#ffffff",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
      contrastText: "#ffffff",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#ffffff",
    },
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "rgba(0,0,0,0.6)",
      disabled: "rgba(0,0,0,0.38)"
    },
    divider: "rgba(0,0,0,0.12)",
    background: {
      default: "#fff",
      paper: "#edf2f9", //"#e7ebf0"
    },
    action: {
      active: "rgba(0,0,0,0.54)",
      //hover: "rgba(255,255,2585,0.3)",
      hoverOpacity: 0.04,
      selected: "rgba(0,0,0,0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0,0,0,0.26)",
      disabledBackground: "rgba(0,0,0,0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0,0,0,0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif"
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 900,
  //     lg: 1200,
  //     xl: 1536,
  //   },
  //   up: (width) => `@media (min-width:${width}px)`,
  //   unit: "px"
  // }
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#0b1727",
      light: "#e3f2fd",
      dark: "rgba(255, 255, 255, 0.1)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#76A0C4",
      light: "#e3f2fd",
      dark: "#42a5f5",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "rgba(0,0,0,0.87)",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "rgba(0,0,0,0.87)",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
      contrastText: "rgba(0,0,0,0.87)",
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "rgba(0,0,0,0.87)",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255,255,255,0.7)",
      disabled: "rgba(255,255,255,0.5)",
    },
    divider: "rgba(255,255,255,0.12)",
    background: {
      default: "#172332",
      paper: "#0b1727",
    },
    action: {
      active: "#fff",
      //hover: "rgba(255,255,255,0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255,255,255,0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255,255,255,0.3)",
      disabledBackground: "rgba(255,255,255,0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255,255,255,0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    }
  },
  typography: {
    fontFamily: "Roboto, sans-serif"
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 900,
  //     lg: 1200,
  //     xl: 1536,
  //   },
  //   up: (width) => `@media (min-width:${width}px)`,
  //   unit: "px"
  // }
};

export const getTheme = (isDarkmode: boolean): any => {
  const currentTheme = isDarkmode ? darkThemeOptions : lightThemeOptions;
  return createTheme(currentTheme);
}
