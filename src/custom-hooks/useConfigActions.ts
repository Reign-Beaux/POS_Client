import { useAppDispatch } from "@/redux";
import { setConfig } from "@/redux/slices";
import { fetchConfig } from "@/utilities";

export const useConfigActions = () => {
  const dispatcher = useAppDispatch();

  const getConfig = async () => {
    const apiConfig = await fetchConfig();
    dispatcher(setConfig(apiConfig));
  };
  
  return { getConfig };
};
