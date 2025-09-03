export type Product = { name: string; price: number; amount: number };

export type OrderSummary = {
  products: Product[];
  shipping: number;
  discount: number;
};
