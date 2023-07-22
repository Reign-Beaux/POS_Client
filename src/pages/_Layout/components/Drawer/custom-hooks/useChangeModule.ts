import { useAppDispatch } from "@/redux";
import { setSelectedModule } from "@/redux/slices";
import { useNavigate } from "react-router-dom";

export const useChangeModule = () => {
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();

  const changeModule = (direction: string, idSelected: number) => {
    dispatcher(setSelectedModule(idSelected));
    navigate(direction);
  };

  return { changeModule };
}