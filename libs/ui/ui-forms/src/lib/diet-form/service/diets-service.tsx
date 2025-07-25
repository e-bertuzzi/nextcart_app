// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export function mapDietToOption(diet: any) {
  return {
    label: diet.dietId, // ✅ usa dietId, non description
    value: diet.dietId,
  };
}

export async function getUserDiets(userId: number | undefined) {
  const res = await api.get(`/diet/users/${userId}/diets`);
  return res.data.map(mapDietToOption);
}

export async function getAllDiets() {
  const res = await api.get('/diet');
  return res.data.map(mapDietToOption);
}

export async function saveUserDiets(userId: number | undefined, dietIds: string[]) {
  return api.patch(`/diet/users/${userId}/diets`, { dietIds });
}

export async function removeUserDiet(userId: number | undefined, dietId: string) {
  return api.delete(`/diet/users/${userId}/diets/${dietId}`);
}
