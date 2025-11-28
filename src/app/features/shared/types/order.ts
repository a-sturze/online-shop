export interface Order {
  customerId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}
