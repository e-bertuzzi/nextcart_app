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

  const addItem = async (cartId: number, productId: string, quantity: number) => {
    try {
      await addItemToCart(cartId, { productId, quantity });
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
      setMessage({ type: 'success', content: 'Quantity updated!' });
      await fetchUserCarts();
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
