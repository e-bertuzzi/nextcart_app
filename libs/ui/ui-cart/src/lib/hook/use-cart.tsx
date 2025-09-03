import { useEffect, useState } from 'react';
import {
  getUserCarts,
  createCart,
  removeCart as removeCartService,
  addItemToCart,
  removeItemByCartItemId,
  updateItemQuantity as updateItemQuantityService,
} from '../service/carts-service';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CartItemWarning } from '@nextcart/enum';

export function useCart(userId: number | undefined) {
  const [carts, setCarts] = useState<any[]>([]);
  const [loadingCarts, setLoadingCarts] = useState(false);
  const [message, setMessage] = useState<any>(null);
  const navigate = useNavigate();

  const fetchUserCarts = async () => {
    if (!userId) return;
    setLoadingCarts(true);
    try {
      const data = await getUserCarts(userId);
      setCarts(data);
    } catch {
      setMessage({ type: 'error', content: 'Failed to load carts.' });
    } finally {
      setLoadingCarts(false);
    }
  };

  const createNewCart = async (name: string) => {
    if (!userId) {
      setMessage({ type: 'error', content: 'User not found.' });
      return null;
    }
    try {
      const newCart = await createCart({ name, consumerId: userId });
      setMessage({ type: 'success', content: 'Cart created successfully!' });
      await fetchUserCarts();
      return newCart;
    } catch {
      setMessage({ type: 'error', content: 'Failed to create cart.' });
      return null;
    }
  };

  const removeCart = async (cartId: number) => {
    try {
      await removeCartService(cartId);
      setCarts((prev) => prev.filter((c) => c.cartId !== cartId));
      setMessage({ type: 'success', content: 'Cart removed successfully!' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', content: 'Failed to remove cart.' });
    }
  };

  const addItem = async (
    cartId: number,
    productId: string,
    quantity: number,
    warnings?: CartItemWarning[]
  ) => {
    try {
      await addItemToCart(cartId, { productId, quantity, warnings });
      setMessage({ type: 'success', content: 'Product added to cart!' });
      await fetchUserCarts();
    } catch {
      setMessage({ type: 'error', content: 'Failed to add product.' });
    }
  };

  const removeItem = async (cartItemId: string) => {
    try {
      await removeItemByCartItemId(cartItemId);
      setMessage({ type: 'success', content: 'Product removed from cart!' });
      await fetchUserCarts();
    } catch {
      setMessage({ type: 'error', content: 'Failed to remove product.' });
    }
  };

  // ✅ Nuovo metodo per aggiornare la quantità di un cartItem
  const updateItemQuantity = async (cartItemId: string, delta: number) => {
    try {
      await updateItemQuantityService(cartItemId, delta);

      // Aggiornamento locale (immutabile e preserva ordine)
      setCarts((prev) =>
        prev.map((cart) => ({
          ...cart,
          items: cart.items.map(
            (item: { cartItemId: string; quantity: number }) =>
              item.cartItemId === cartItemId
                ? { ...item, quantity: item.quantity + delta }
                : item
          ),
        }))
      );

      setMessage({ type: 'success', content: 'Quantity updated!' });
    } catch {
      setMessage({ type: 'error', content: 'Failed to update quantity.' });
    }
  };

  useEffect(() => {
    fetchUserCarts();
  }, [userId]);

  return {
    carts,
    loadingCarts,
    fetchUserCarts,
    createNewCart,
    removeCart,
    addItem,
    removeItem,
    updateItemQuantity, // aggiunto qui
    message,
    setMessage,
  };
}
