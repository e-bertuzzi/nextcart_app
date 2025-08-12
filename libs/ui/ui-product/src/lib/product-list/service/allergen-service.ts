// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export async function getAllergens() {
  try {
    const response = await api.get('/product-allergens');
    // Assumiamo che la risposta sia in response.data
    const data = response.data;
    console.log("data allergen", data);
    console.log("allergen",data.map((a: any) => ({ label: a.name, value: a.id })));

    return data.map((a: any) => ({
      label: a.allergenName,
      value: a.allergenId,
    }));
  } catch (error) {
    console.error('getAllergens error:', error);
    throw new Error('Errore nel recupero degli allergeni');
  }
}