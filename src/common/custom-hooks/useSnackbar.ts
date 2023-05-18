import { setSnackbar } from "@/redux/slices";
import { useDispatch } from "react-redux";
import { AlertColors } from "../consts";

const useSnackbar = () => {
  const dispatcher = useDispatch();
  
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