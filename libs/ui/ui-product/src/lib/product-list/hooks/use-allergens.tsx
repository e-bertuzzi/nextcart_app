import { useState, useEffect } from 'react';
import { getAllergens } from '../service/allergen-service';

export function useAllergens() {
  const [allergens, setAllergens] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllergens() {
      try {
        const formatted = await getAllergens();
        setAllergens(formatted);
      } catch (e) {
        setError((e as Error).message || 'Failed to load allergens');
      } finally {
        setLoading(false);
      }
    }

    fetchAllergens();
  }, []);

  return { allergens, loading, error };
}
