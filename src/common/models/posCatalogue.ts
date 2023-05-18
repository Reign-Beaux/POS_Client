export interface POSCatalogue {
  id: number;
  code: string;
  description: string;
}

export const posCatalogueEmpty: POSCatalogue = {
  id: 0,
  code: "",
  description: "",
}