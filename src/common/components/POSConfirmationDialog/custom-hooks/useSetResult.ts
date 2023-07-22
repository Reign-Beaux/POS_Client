import { useAppDispatch } from "@/redux";
import { setResponse } from "@/redux/slices";

export const useSetResult = () => {
  const dispatcher = useAppDispatch();
  
  const setResult = async (result: boolean) => {
    dispatcher(setResponse(result));
  };

  return { setResult };
}