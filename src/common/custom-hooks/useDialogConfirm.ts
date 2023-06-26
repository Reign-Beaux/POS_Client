import { POSReducer } from "@/redux";
import { resetConfirm, setConfirm } from "@/redux/slices";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useDialogConfirm = () => {
  const dispatcher = useDispatch();
  const { responseConfirmation } = useSelector((store: POSReducer) => store.confirm);
  const callbackConfirmation = useRef<Function>(() => {});

  const showDialogConfirm = (message: string, callback: Function) => {
    callbackConfirmation.current = callback;
    dispatcher(
      setConfirm({
        isOpen: true,
        message: message,
      })
    );
  };

  useEffect(() => {
    if (responseConfirmation === null) return;
    if (responseConfirmation) callbackConfirmation.current();

    dispatcher(resetConfirm());
  }, [responseConfirmation]);

  return {
    showDialogConfirm,
  };
};

export default useDialogConfirm;
