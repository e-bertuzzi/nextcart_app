// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export async function getUserCarts(userId: number | undefined) {
  const res = await api.get(`/cart/user/${userId}`);
  return res.data; // Assumiamo che il backend restituisca lista di carrelli con items
}

export async function createCart(data: { name: string; consumerId: number | undefined }) {
  const res = await api.post('/cart', data);
  return res.data;
}

export async function removeCart(cartId: number) {
  return api.delete(`/cart/${cartId}`);
}

export async function addItemToCart(cartId: number, data: { productId: string; quantity: number }) {
  const res = await api.post(`/cart/${cartId}/items`, data);
  return res.data;
}

export async function removeItemByCartItemId(cartItemId: string) {
  return api.delete(`/cart/items/${cartItemId}`);
}
export async function updateItemQuantity(cartItemId: string, delta: number) {
  const res = await api.patch(`/cart/items/${cartItemId}`, { delta });
  return res.data;
}