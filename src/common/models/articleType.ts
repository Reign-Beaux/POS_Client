import { POSCatalogue } from "./posCatalogue";

export interface ArticleType extends POSCatalogue {}

export const articleTypeEmpty: ArticleType = {
  id: 0,
  code: "",
  description: "",
};