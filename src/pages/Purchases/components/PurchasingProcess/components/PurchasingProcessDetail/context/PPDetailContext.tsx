import { PurchaseDetail } from "common/models";
import { Context, createContext, useContext, useState } from "react";

type PPDetailProviderProps = {
  children: React.ReactNode;
};

type ContextProps = {
  purchaseDetail: PurchaseDetail[];
  setPurchaseDetail: Function;
};

const ContextEmptyState: ContextProps = {
  purchaseDetail: [],
  setPurchaseDetail: () => {},
};

const PPDetailContext: Context<ContextProps> = createContext(ContextEmptyState);

export const PPDetailProvider: React.FC<PPDetailProviderProps> = ({ children }) => {
  const [purchaseDetail, setPurchaseDetail] = useState<PurchaseDetail[]>([]);

  return (
    <PPDetailContext.Provider
      value={{
        purchaseDetail: purchaseDetail,
        setPurchaseDetail: setPurchaseDetail,
      }}
    >
      {children}
    </PPDetailContext.Provider>
  );
};

export const usePPDetailContext = () => {
  const context = useContext(PPDetailContext);

  if (!context) throw Error("This component is not found inside PPDetailContext");

  return context;
};
