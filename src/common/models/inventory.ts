export interface Inventory {
  id: number;
  articleId: number;
  quantityInStock: number;
}

export const inventoryEmpty: Inventory = {
  id: 0,
  articleId: 0,
  quantityInStock: 0
}