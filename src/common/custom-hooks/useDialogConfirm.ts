import { POSReducer } from "@/redux";
import { resetConfirm, setConfirm } from "@/redux/slices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useDialogConfirm = () => {
  const dispatcher = useDispatch();
  const { responseConfirmation } = useSelector((store: POSReducer) => store.confirm);
  const [response, setResponse] = useState<boolean | null>(null);

  const showDialogConfirm = (message: string) => {
    dispatcher(
      setConfirm({
        isOpen: true,
        message: message,
      })
    );
  };

  const resetResponse = () => setResponse(null);

  useEffect(() => {
    if (responseConfirmation === null) return;
    
    setResponse(responseConfirmation);
    dispatcher(resetConfirm());
  }, [responseConfirmation]);

  return {
    showDialogConfirm,
    resetResponse,
    response,
  };
};

export default useDialogConfirm;
