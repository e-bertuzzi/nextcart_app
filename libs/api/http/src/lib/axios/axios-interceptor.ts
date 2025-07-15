// src/api/axiosInstance.ts
import axios from 'axios';
import { getAccessToken, setAccessToken } from './token.service';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, 
});

api.interceptors.request.use(
  config => {
    const token = getAccessToken();
    console.log('Interceptor: token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
         console.log('Token scaduto, provo a fare refresh...');
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          'http://localhost:3000/api/auth/refresh',
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (e) {
        console.log('Refresh token fallito:', e);

        // Solo se NON sei nella pagina di login, fai redirect
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }

        return Promise.reject(e);
      }

    }

    return Promise.reject(error);
  }
);

