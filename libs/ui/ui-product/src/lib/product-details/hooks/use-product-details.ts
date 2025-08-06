// hooks/useProductDetails.ts
import { useEffect, useState } from 'react';
import { getProductById } from '../service/product-service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';

export function useProductDetails(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(productId)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading };
}
