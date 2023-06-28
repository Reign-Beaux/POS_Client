export interface PurchaseDTO {
  id: number;
  supplierFullName: string;
  userFullName: string;
  subtotal: number;
  taxes: number;
  total: number;
  orderDate: Date;
  status: number;
}