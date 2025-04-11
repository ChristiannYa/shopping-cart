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

export interface DbUser {
  user_id: number;
  email: string;
  email_verified: Date | null;
  password_hash: string;
  name: string | null;
  created_at: Date;
  updated_at: Date;
}
