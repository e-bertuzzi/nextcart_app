import { useEffect, useState } from 'react';
import {
  getUserCarts,
  createCart,
  removeCart as removeCartService,
  addItemToCart,
  removeItemByCartItemId,
} from '../service/carts-service';
import { useNavigate } from 'react-router-dom';

export function useCart(userId: number | undefined) {
  const [carts, setCarts] = useState<any[]>([]);
  const [loadingCarts, setLoadingCarts] = useState(false);
  const [message, setMessage] = useState<any>(null);
  const navigate = useNavigate();

  // Carica i carrelli dell'utente
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

  // Crea un nuovo carrello
  const createNewCart = async (name: string) => {
    if (!userId) {
      setMessage({ type: 'error', content: 'User not found.' });
      return null;
    }
    try {
      const newCart = await createCart({ name, consumerId: userId });
      setMessage({ type: 'success', content: 'Cart created successfully!' });
      await fetchUserCarts(); // aggiorna la lista
      return newCart;
    } catch {
      setMessage({ type: 'error', content: 'Failed to create cart.' });
      return null;
    }
  };

  const removeCart = async (cartId: number) => {
    try {
      await removeCartService(cartId);
      // usa cartId invece di id
      setCarts((prev) => prev.filter((c) => c.cartId !== cartId));
      setMessage({ type: 'success', content: 'Cart removed successfully!' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', content: 'Failed to remove cart.' });
    }
  };

  // Aggiunge un prodotto a un carrello
  const addItem = async (
    cartId: number,
    productId: string,
    quantity: number
  ) => {
    try {
      await addItemToCart(cartId, { productId, quantity });
      setMessage({ type: 'success', content: 'Product added to cart!' });
      fetchUserCarts();
    } catch {
      setMessage({ type: 'error', content: 'Failed to add product.' });
    }
  };

  // Rimuove un prodotto da un carrello
  const removeItem = async (cartItemId: string) => {
    try {
      await removeItemByCartItemId(cartItemId); // ✅ passa il cartItemId
      setMessage({ type: 'success', content: 'Product removed from cart!' });
      await fetchUserCarts();
    } catch {
      setMessage({ type: 'error', content: 'Failed to remove product.' });
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
    message,
    setMessage,
  };
}
