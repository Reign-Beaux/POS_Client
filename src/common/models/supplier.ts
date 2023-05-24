export interface Supplier {
  id: number;
  brandId: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  rfc: string;
  phone: string;
  cellphone: string;
  observations: string;
  email: string;
}

export const supplierEmpty: Supplier = {
  id: 0,
  brandId: 0,
  name: "",
  paternalSurname: "",
  maternalSurname: "",
  rfc: "",
  phone: "",
  cellphone: "",
  observations: "",
  email: "",
};
