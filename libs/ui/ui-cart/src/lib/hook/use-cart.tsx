import { useEffect, useState } from 'react';
import {
  getUserCarts,
  createCart,
  removeCart as removeCartService,
  addItemToCart,
  removeItemFromCart,
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
      return;
    }
    try {
      await createCart({ name, consumerId: userId }); // ✅ qui consumerId
      setMessage({ type: 'success', content: 'Cart created successfully!' });
      fetchUserCarts();
    } catch {
      setMessage({ type: 'error', content: 'Failed to create cart.' });
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
  const removeItem = async (cartId: number, productId: string) => {
    try {
      await removeItemFromCart(cartId, productId);
      setMessage({ type: 'success', content: 'Product removed from cart!' });
      fetchUserCarts();
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
