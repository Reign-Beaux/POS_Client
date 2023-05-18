import { Context, createContext, useContext, useState } from "react";

type ArticlesTypesProviderProps = {
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

const ArticlesTypesContext: Context<ContextProps> = createContext(ContextEmptyState);

export const ArticlesTypesProvider: React.FC<ArticlesTypesProviderProps> = ({ children }) => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [titleDialog, setTitleDialog] = useState<string>("");
  const [isGridLoading, setIsGridLoading] = useState<boolean>(true);
  const [idSelected, setIdSelected] = useState<number>(0);

  return (
    <ArticlesTypesContext.Provider
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
    </ArticlesTypesContext.Provider>
  );
};

export const useArticlesTypesContext = () => {
  const context = useContext(ArticlesTypesContext);

  if (!context) throw Error("This component is not found inside articlesTypesContext");

  return context;
};