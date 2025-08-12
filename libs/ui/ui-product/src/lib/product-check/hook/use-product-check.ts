// hooks/useProductExists.ts
import { useState } from 'react';
import { checkProductExists } from '../service/product-check-service';

export function useProductExists() {
  const [exists, setExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const checkExists = async (productId: string) => {
    if (!productId.trim()) {
      throw new Error('Inserisci un ID!');
    }
    setLoading(true);
    try {
      const exists = await checkProductExists(productId);
      setExists(exists);
    } catch (err) {
      console.error('Errore verifica prodotto:', err);
      setExists(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { exists, loading, checkExists };
}
