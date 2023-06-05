export interface PurchaseDetail {
  id: number;
  record: number;
  purchaseId: number;
  articleId: number;
  quantitySold: number;
  price: number;
  subtotal: number;
  taxes: number;
  total: number;
}

export const purchaseDetailEmpty: PurchaseDetail = {
  id: 0,
  record: 0,
  purchaseId: 0,
  articleId: 0,
  quantitySold: 0,
  price: 0,
  subtotal: 0,
  taxes: 0,
  total: 0,
};
