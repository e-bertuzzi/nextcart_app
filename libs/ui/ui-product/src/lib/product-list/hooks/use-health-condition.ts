import { useEffect, useState } from 'react';
import { getUserNutrientConstraints } from '../service/health-condition-service';

export function useUserNutrientConstraints(userId?: number) {
  const [nutrientConstraints, setNutrientConstraints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getUserNutrientConstraints(userId)
      .then((data) => {
        setNutrientConstraints(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Errore caricamento vincoli nutrizionali:', err);
        setError('Errore nel recupero dei vincoli nutrizionali');
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { nutrientConstraints, loading, error };
}
