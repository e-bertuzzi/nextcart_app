import { api } from '@nextcart/http';

export function mapDietToOption(diet: any) {
  return {
    label: diet.description,
    value: diet.dietId,
  };
}

export async function getUserDiets(userId: number) {
  const res = await api.get(`/diet/users/${userId}/diets`);
  return res.data.map(mapDietToOption);
}

export async function getAllDiets() {
  const res = await api.get('/diet');
  return res.data.map(mapDietToOption);
}

export async function saveUserDiets(userId: number, dietIds: number[]) {
  return api.patch(`/diet/users/${userId}/diets`, { dietIds });
}

export async function removeUserDiet(userId: number, dietId: number) {
  return api.delete(`/diet/users/${userId}/diets/${dietId}`);
}
