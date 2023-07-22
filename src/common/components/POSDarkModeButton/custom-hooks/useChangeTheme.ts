import { useAppDispatch, useAppSelector } from "@/redux";
import { setTheme } from "@/redux/slices";

export const useChangeTheme = () => {
  const dispatcher = useAppDispatch();
  const { isDarkMode } = useAppSelector((store) => store.theme);

  const changeTheme = () => {
    dispatcher(
      setTheme({
        isDarkMode: !isDarkMode,
      })
    );
  };

  return { changeTheme };
};
