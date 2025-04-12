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

export interface User {
  user_id: number;
  email: string;
  name: string;
  email_verified: boolean;
  created_at: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
