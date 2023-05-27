import { POSCatalogue, posCatalogueEmpty } from "./posCatalogue";

export interface Brand extends POSCatalogue {}

export const brandEmpty: Brand = { ...posCatalogueEmpty };
