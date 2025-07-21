// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export function mapDietToOption(diet: any) {
  return {
    label: diet.description,
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

export async function saveUserDiets(userId: number | undefined, dietIds: number[]) {
  return api.patch(`/diet/users/${userId}/diets`, { dietIds });
}

export async function removeUserDiet(userId: number | undefined, dietId: number) {
  return api.delete(`/diet/users/${userId}/diets/${dietId}`);
}
