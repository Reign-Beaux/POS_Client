import { useAppDispatch, useAppSelector } from "@/redux";
import { resetConfirm, setConfirm } from "@/redux/slices";
import { useEffect, useRef } from "react";

const useDialogConfirm = () => {
  const dispatcher = useAppDispatch();
  const { responseConfirmation } = useAppSelector((store) => store.confirm);
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
