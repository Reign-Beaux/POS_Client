import { POSCatalogue, posCatalogueEmpty } from "./posCatalogue";

export interface Feature extends POSCatalogue {
  direction: string;
  isChildren: boolean;
}

export const featureEmpty: Feature = {
  ...posCatalogueEmpty,
  direction: "",
  isChildren: false,
}