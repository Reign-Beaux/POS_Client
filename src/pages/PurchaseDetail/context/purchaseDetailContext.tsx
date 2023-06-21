import { Context, createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";

type PurchaseDetailProviderProps = {
  children: React.ReactNode;
};

type ContextProps = {
  isOpenDialog: boolean;
  setIsOpenDialog: Function;
  titleDialog: string;
  setTitleDialog: Function;
  isGridLoading: boolean;
  setIsGridLoading: Function;
  idSelected: number;
  setIdSelected: Function;
  purchaseId: number;
};

const ContextEmptyState: ContextProps = {
  isOpenDialog: false,
  setIsOpenDialog: () => {},
  titleDialog: "",
  setTitleDialog: () => {},
  isGridLoading: true,
  setIsGridLoading: () => {},
  idSelected: 0,
  setIdSelected: () => {},
  purchaseId: 0
};

const PurchaseDetailContext: Context<ContextProps> = createContext(ContextEmptyState);

export const PurchaseDetailProvider: React.FC<PurchaseDetailProviderProps> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [titleDialog, setTitleDialog] = useState<string>("");
  const [isGridLoading, setIsGridLoading] = useState<boolean>(true);
  const [idSelected, setIdSelected] = useState<number>(0);

  return (
    <PurchaseDetailContext.Provider
      value={{
        isOpenDialog: isOpenDialog,
        setIsOpenDialog: setIsOpenDialog,
        titleDialog: titleDialog,
        setTitleDialog: setTitleDialog,
        isGridLoading: isGridLoading,
        setIsGridLoading: setIsGridLoading,
        idSelected: idSelected,
        setIdSelected: setIdSelected,
        purchaseId: Number(id)
      }}
    >
      {children}
    </PurchaseDetailContext.Provider>
  );
};

export const usePurchaseDetailContext = () => {
  const context = useContext(PurchaseDetailContext);

  if (!context) throw Error("This component is not found inside PurchaseDetailContext");

  return context;
};
