export interface Product {
  product_id: number;
  name: string;
  price: number;
  in_stock: boolean;
  quantity: number;
}

export interface ProductRow {
  product_id: number;
  name: string;
  price: number | number;
  in_stock: boolean;
  quantity: number;
}

export interface User {
  user_id: number;
  email: string;
  name: string;
  email_verified: boolean | null;
  created_at?: string;
}

export interface JwtPayload {
  userId: number;
  email: string;
  name: string;
  iat: number;
  exp: number;
}
