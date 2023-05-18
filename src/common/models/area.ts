import { POSCatalogue } from "./posCatalogue";

export interface Area extends POSCatalogue {}

export const areaEmpty: Area = {
  id: 0,
  code: "",
  description: "",
};
