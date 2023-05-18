import { POSCatalogue, posCatalogueEmpty } from "./posCatalogue";

export interface Feature extends POSCatalogue {
  direction: string;
}

export const featureEmpty: Feature = {
  ...posCatalogueEmpty,
  direction: ""
}