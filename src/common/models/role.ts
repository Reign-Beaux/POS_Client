import { POSCatalogue } from "./posCatalogue";

export interface Role extends POSCatalogue {}

export const roleEmpty: Role = {
  id: 0,
  code: "",
  description: "",
};