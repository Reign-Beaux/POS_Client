import { useAppDispatch } from "@/redux";
import { setSnackbar } from "@/redux/slices";
import { AlertColors } from "../consts";

const useSnackbar = () => {
  const dispatcher = useAppDispatch();
  
  const showSnackbar = (message: string, severity: AlertColors) => {
    dispatcher(
      setSnackbar({
        isOpen: true,
        severity: severity,
        message: message,
      })
    );
  }

  return {
    showSnackbar
  }
}

export default useSnackbar;