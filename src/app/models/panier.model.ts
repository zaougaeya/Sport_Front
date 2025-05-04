export interface PanierItem {
  productId: string;
  quantity: number;
  prix: number;
}

export interface Panier {
  _id: string;
  userId: string;
  items: PanierItem[];
  totalPrice: number;
}
