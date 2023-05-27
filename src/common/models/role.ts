import { POSCatalogue, posCatalogueEmpty } from "./posCatalogue";

export interface Role extends POSCatalogue {}

export const roleEmpty: Role = { ...posCatalogueEmpty };