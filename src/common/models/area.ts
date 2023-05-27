import { POSCatalogue, posCatalogueEmpty } from "./posCatalogue";

export interface Area extends POSCatalogue {}

export const areaEmpty: Area = { ...posCatalogueEmpty };
