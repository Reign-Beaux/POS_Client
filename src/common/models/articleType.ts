import { POSCatalogue, posCatalogueEmpty } from "./posCatalogue";

export interface ArticleType extends POSCatalogue {}

export const articleTypeEmpty: ArticleType = { ...posCatalogueEmpty };