export interface Purchase {
  id: number;
  supplierId: number;
  userId: number;
  subtotal: number;
  taxes: number;
  total: number;
  orderDate: Date;
  status: number;
}

export const purchaseEmpty: Purchase = {
  id: 0,
  supplierId: 0,
  userId: 0,
  subtotal: 0,
  taxes: 0,
  total: 0,
  orderDate: new Date(),
  status: 0,
};
