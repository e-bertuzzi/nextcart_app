// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export async function getUserHealthConditions(userId: number) {
  const res = await api.get(`/health-conditions/users/${userId}/health-conditions`);
  return res.data.map((c: any) => ({ label: c.description, value: c.healthConditionId }));
}

export async function filterHealthConditions(selectedIds: number[], categoryCode: string) {
  const res = await api.post('/health-conditions/filter', {
    selectedConditionIds: selectedIds,
    categoryCode,
  });
  return res.data.map((c: any) => ({ label: c.description, value: c.healthConditionId }));
}

export async function saveUserHealthConditions(userId: number, healthConditionIds: number[]) {
  return api.patch(`/health-conditions/users/${userId}/health-conditions`, {
    healthConditionIds,
  });
}

export async function removeUserHealthCondition(userId: number, conditionId: number) {
  return api.delete(`/health-conditions/users/${userId}/health-conditions/${conditionId}`);
}
