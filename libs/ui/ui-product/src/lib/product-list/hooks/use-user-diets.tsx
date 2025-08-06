import { useEffect, useState } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http'; // o come è configurato il client

export function useUserDiets(userId: number | undefined) {
  const [userDiets, setUserDiets] = useState<
    { label: string; value: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    api
      .get(`/diet-consumer-choices/users/${userId}`)
      .then((res) => {
        // res.data è array di DietConsumerChoice con relazione diet
        const diets = res.data.map((choice: any) => ({
          label: choice.diet.label || choice.diet.dietId, // fallback se label è vuoto
          value: choice.diet.dietId,
        }));
        setUserDiets(diets);
      })
      .catch(() => setError('Errore caricamento diete utente'))
      .finally(() => setLoading(false));
  }, [userId]);

  return { userDiets, loading, error };
}
