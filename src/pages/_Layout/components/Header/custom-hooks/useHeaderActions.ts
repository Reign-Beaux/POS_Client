import { useAppDispatch } from "@/redux";
import { logoutSession, setSelectedModule } from "@/redux/slices";
import { useNavigate } from "react-router-dom";

export const useHeaderActions = () => {
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();

  const goHome = () => {
    dispatcher(setSelectedModule(0));
    navigate("/");
  };

  const logOut = () => {
    dispatcher(setSelectedModule(0));
    dispatcher(logoutSession());
  };

  return { goHome, logOut };
};
