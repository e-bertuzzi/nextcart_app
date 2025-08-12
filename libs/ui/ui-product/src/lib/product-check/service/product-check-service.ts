// services/productService.ts
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export const checkProductExists = async (productId: string): Promise<boolean> => {
  const response = await api.get(`/products/check?id=${encodeURIComponent(productId)}`);
  return response.data.exists;
};
