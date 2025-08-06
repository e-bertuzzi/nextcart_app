// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export async function getAllProducts() {
  const res = await api.get('/products');
  return res.data;
}

export async function getProductById(productId: string) {
  const res = await api.get(`/products/${productId}`);
  return res.data;
}
