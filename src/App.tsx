import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { POSConfirmationDialog, POSSnackbar } from "./common/components";
import { ThemeProviderWrapper } from "./components";
import { POSReducer } from "./redux";
import { setConfig } from "./redux/slices";
import { router } from "./router";
import { getTheme } from "./themes";
import { fetchConfig } from "./utilities";

function App() {
  const dispatcher = useDispatch();
  const { isDarkMode } = useSelector((store: POSReducer) => store.theme);
  const { API_URL } = useSelector((store: POSReducer) => store.config);

  const getConfig = async () => {
    const apiConfig = await fetchConfig();
    dispatcher(setConfig(apiConfig));
  };

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
