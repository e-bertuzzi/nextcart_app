// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http'; // o da dove prendi api
import { Option, ProductCreatePayload } from '../interface/types';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Diet } from '@nextcart/models'; 

export const productService = {
  getCategories: async (): Promise<Option[]> => {
    const res = await api.get('/product-categories');
    return res.data;
  },

  getClaims: async (): Promise<Option[]> => {
    const res = await api.get('/product-claims');
    return res.data;
  },

  getAllergens: async (): Promise<Option[]> => {
    const res = await api.get('/product-allergens');
    return res.data;
  },

  getDiets: async (): Promise<Diet[]> => {
    const res = await api.get('/diet');
    return res.data;
  },

  getNutritionalInfos: async (): Promise<Option[]> => {
    const res = await api.get('/product-nutritional-info');
    return res.data;
  },

  createProduct: async (payload: ProductCreatePayload) => {
    return api.post('/products', payload);
  },
};
