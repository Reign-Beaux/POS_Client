import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { POSConfirmationDialog, POSSnackbar } from "./common/components";
import { useAxiosInterceptor } from "./common/custom-hooks";
import { ThemeProviderWrapper } from "./components";
import { useConfigActions } from "./custom-hooks";
import { useAppSelector } from "./redux";
import { router } from "./router";
import { getTheme } from "./themes";

function App() {
  useAxiosInterceptor();
  const { getConfig } = useConfigActions();
  const { isDarkMode } = useAppSelector((store) => store.theme);
  const { API_URL } = useAppSelector((store) => store.config);

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;

    const theme = getTheme(isDarkMode);
    body.style.backgroundColor = theme.palette.background.paper;
  }, [isDarkMode]);

  return (
    <>
      {API_URL !== "" && (
        <ThemeProviderWrapper>
          <RouterProvider router={router} />
          <POSSnackbar />
          <POSConfirmationDialog />
        </ThemeProviderWrapper>
      )}
    </>
  );
}

export default App;
