// services/productService.ts
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models'; // Assumi che tu abbia un tipo Product

export const getProductById = async (productId: string): Promise<Product> => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};
