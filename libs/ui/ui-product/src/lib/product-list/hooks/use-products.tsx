import { useEffect, useState } from 'react';
import { getAllProducts } from '../service/product-service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  console.log(products)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (e) {
      setError('Errore nel caricamento dei prodotti.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
}