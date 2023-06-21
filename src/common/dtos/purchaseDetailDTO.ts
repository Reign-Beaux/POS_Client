export interface PurchaseDetailDTO {
  id: number;
  purchaseId: number;
  articleDescription: string;
  quantitySold: number;
  price: number;
  subtotal: number;
  taxes: number;
  total: number;
}