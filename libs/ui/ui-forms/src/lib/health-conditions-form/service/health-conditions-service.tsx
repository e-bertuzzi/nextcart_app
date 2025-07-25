// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export async function getUserHealthConditions(userId: number | undefined) {
  const res = await api.get(`/health-conditions/users/${userId}/health-conditions`);
  return res.data.map((c: any) => ({ label: c.description, value: c.healthConditionId }));
}

export async function filterHealthConditions(selectedIds: string[], categoryCode: string) {
  const res = await api.post('/health-conditions/filter', {
    selectedConditionIds: selectedIds,
    categoryCode,
  });
  return res.data.map((c: any) => ({ label: c.description, value: c.healthConditionId }));
}

export async function saveUserHealthConditions(userId: number | undefined, healthConditionIds: string[]) {
  return api.patch(`/health-conditions/users/${userId}/health-conditions`, {
    healthConditionIds,
  });
}

export async function removeUserHealthCondition(userId: number | undefined, conditionId: string) {
  return api.delete(`/health-conditions/users/${userId}/health-conditions/${conditionId}`);
}

