// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from "@nextcart/http";

export async function getUserNutrientConstraints(userId: number | undefined) {
  try {
    const response = await api.get(`/consumer-health-conditions/user/${userId}/nutrient-constraints`);
    console.log("health condition", response);
    return response.data;
  } catch (error) {
    console.error('getUserNutrientConstraints error:', error);
    throw new Error('Errore nel recupero dei vincoli nutrizionali utente');
  }
}
