export interface Product {
  product_id: number;
  name: string;
  price: number;
  in_stock: boolean;
  quantity: number;
}

export interface CartItem {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
}

export interface ProductRow {
  product_id: number;
  name: string;
  price: number | number;
  in_stock: boolean;
  quantity: number;
}
