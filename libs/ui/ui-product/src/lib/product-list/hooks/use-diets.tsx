// hooks/use-diets.ts
import { useEffect, useState } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export function useDiets() {
  const [diets, setDiets] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get('/diet')
      .then((res) => {
        const options = res.data.map((diet: any) => ({
          label: diet.label || diet.dietId, // fallback se label non è valorizzato
          value: diet.dietId,
        }));

        setDiets(options);
      })
      .catch(() => setError('Errore nel caricamento delle diete'))
      .finally(() => setLoading(false));
  }, []);

  return { diets, loading, error };
}
