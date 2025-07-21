// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export async function getUserBodyCompositions(userId: number | undefined) {
  const res = await api.get(`/body-composition/users/${userId}`);
  return res.data;
}

export async function getBodyCompositionByDate(userId: number | undefined, date: string) {
  const res = await api.get(`/body-composition/users/${userId}/${date}`);
  return res.data;
}

export async function createOrUpdateBodyComposition(userId: number | undefined, dto: {
  date: string | Date;
  weight?: number;
  height?: number;
}) {
  return api.post(`/body-composition/users/${userId}`, dto);
}

export async function deleteBodyCompositionByDate(userId: number | undefined, date: string) {
  return api.delete(`/body-composition/users/${userId}/${date}`);
}
