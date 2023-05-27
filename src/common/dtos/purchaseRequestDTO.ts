export interface PurchaseRequestDTO {
  id: number;
  supplierId: number;
  userName: string;
}

export const purchaseRequestDTOEmpty: PurchaseRequestDTO = {
  id: 0,
  supplierId: 0,
  userName: "",
};
