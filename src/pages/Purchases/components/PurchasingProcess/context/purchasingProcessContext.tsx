import { Context, createContext, useContext, useState } from "react";

type PurchasingProcessProviderProps = {
  children: React.ReactNode;
};

type ContextProps = {
  isOpenDialog: boolean;
  setIsOpenDialog: Function;
  isOpenDialogDetail: boolean;
  setIsOpenDialogDetail: Function;
  titleDialog: string;
  setTitleDialog: Function;
  isGridLoading: boolean;
  setIsGridLoading: Function;
  idSelected: number;
  setIdSelected: Function;
};

const ContextEmptyState: ContextProps = {
  isOpenDialog: false,
  setIsOpenDialog: () => {},
  isOpenDialogDetail: false,
  setIsOpenDialogDetail: () => {},
  titleDialog: "",
  setTitleDialog: () => {},
  isGridLoading: true,
  setIsGridLoading: () => {},
  idSelected: 0,
  setIdSelected: () => {},
};

const PurchasingProcessContext: Context<ContextProps> = createContext(ContextEmptyState);

export const PurchasingProcessProvider: React.FC<PurchasingProcessProviderProps> = ({ children }) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isOpenDialogDetail, setIsOpenDialogDetail] = useState<boolean>(false);
  const [titleDialog, setTitleDialog] = useState<string>("");
  const [isGridLoading, setIsGridLoading] = useState<boolean>(true);
  const [idSelected, setIdSelected] = useState<number>(0);

  return (
    <PurchasingProcessContext.Provider
      value={{
        isOpenDialog: isOpenDialog,
        setIsOpenDialog: setIsOpenDialog,
        isOpenDialogDetail: isOpenDialogDetail,
        setIsOpenDialogDetail: setIsOpenDialogDetail,
        titleDialog: titleDialog,
        setTitleDialog: setTitleDialog,
        isGridLoading: isGridLoading,
        setIsGridLoading: setIsGridLoading,
        idSelected: idSelected,
        setIdSelected: setIdSelected,
      }}
    >
      {children}
    </PurchasingProcessContext.Provider>
  );
};

export const usePurchasingProcessContext = () => {
  const context = useContext(PurchasingProcessContext);

  if (!context)
    throw Error("This component is not found inside PurchasingProcessContext");

  return context;
};
