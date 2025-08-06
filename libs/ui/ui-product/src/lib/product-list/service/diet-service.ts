// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http'; // o come è esportato esattamente

export async function getUserDiets(userId: number | undefined): Promise<string[]> {
  try {
    // Chiamata GET all'endpoint che restituisce le diete di un consumer
    const response = await api.get(`/users/${userId}/diets`);
    // Supponiamo i dati siano direttamente nell'oggetto response.data
    return response.data as string[];
  } catch (error) {
    console.error('getUserDiets error:', error);
    throw new Error('Errore nel recupero delle diete utente');
  }
}
