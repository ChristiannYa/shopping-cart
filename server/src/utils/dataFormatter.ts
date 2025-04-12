import { Product, ProductRow } from "../../../src/lib/definitions";

export const formatProduct = (product: ProductRow): Product => {
  return {
    product_id: product.product_id,
    name: product.name,
    price:
      typeof product.price === "string"
        ? parseFloat(product.price)
        : product.price,
    in_stock: product.in_stock,
    quantity: product.quantity,
  };
};
