import { useAppDispatch } from "@/redux";
import { resetSnackbar } from "@/redux/slices";

export const useCloseSnackbar = () => {
  const dispatcher = useAppDispatch();

  const closeSnackbar = () => {
    dispatcher(resetSnackbar());
  };

  return { closeSnackbar };
};
