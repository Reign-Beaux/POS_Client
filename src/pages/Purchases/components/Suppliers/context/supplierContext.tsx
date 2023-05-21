import { Context, createContext, useContext, useState } from "react";

type SupplierProviderProps = {
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
};

const SupplierContext: Context<ContextProps> = createContext(ContextEmptyState);

export const SupplierProvider: React.FC<SupplierProviderProps> = ({ children }) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [titleDialog, setTitleDialog] = useState<string>("");
  const [isGridLoading, setIsGridLoading] = useState<boolean>(true);
  const [idSelected, setIdSelected] = useState<number>(0);

  return (
    <SupplierContext.Provider
      value={{
        isOpenDialog: isOpenDialog,
        setIsOpenDialog: setIsOpenDialog,
        titleDialog: titleDialog,
        setTitleDialog: setTitleDialog,
        isGridLoading: isGridLoading,
        setIsGridLoading: setIsGridLoading,
        idSelected: idSelected,
        setIdSelected: setIdSelected,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplierContext = () => {
  const context = useContext(SupplierContext);

  if (!context) throw Error("This component is not found inside SupplierContext");

  return context;
};
