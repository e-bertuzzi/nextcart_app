import axios from 'axios';

export async function getUserPhysicalActivities(userId?: number) {
  if (!userId) return [];
  const res = await fetch(`/api/physical-activities/consumer/${userId}`);
  return await res.json();
}


export const getAllPhysicalActivities = () => {
  return axios.get(`/api/physical-activities`).then(res => res.data);
};

export const saveUserPhysicalActivity = (payload: any, userId: number |undefined) => {
  return axios.post(`/api/physical-activities`, { ...payload, userId });
};

export const removeUserPhysicalActivity = (activityId: number) => {
  return axios.delete(`/api/physical-activities/${activityId}`);
};

export const getAllActivities = () => {
  return axios.get(`/api/activity`).then(res => res.data);
};

