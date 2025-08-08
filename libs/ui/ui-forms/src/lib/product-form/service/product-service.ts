// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http'; // o da dove prendi api
import { Option, ProductCreatePayload } from '../interface/types';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Diet } from '@nextcart/models';

export const productService = {
  getCategories: async (): Promise<Option[]> => {
    const res = await api.get('/product-categories');
    // mappa ProductCategory[] in Option[]
    return res.data.map((cat: any) => ({
      label: cat.category ?? 'No category', // o altro campo da mostrare
      value: cat.productCategoryId,
    }));
  },

  getClaims: async (): Promise<Option[]> => {
    const res = await api.get('/product-claims');
    return res.data.map((claim: { claimId: string; description: string }) => ({
      label: claim.description,
      value: claim.claimId,
    }));
  },

  getAllergens: async (): Promise<Option[]> => {
    const res = await api.get('/product-allergens');
    return res.data.map(
      (allergen: { allergenId: string; allergenName: string }) => ({
        label: allergen.allergenName ?? allergen.allergenId, // fallback se allergenName mancante
        value: allergen.allergenId,
      })
    );
  },

  getDiets: async (): Promise<Diet[]> => {
    const res = await api.get('/diet');
    return res.data;
  },

  getNutritionalInfos: async (): Promise<Option[]> => {
    const res = await api.get('/nutritional-information');
    // res.data è presumibilmente NutritionalInformation[]
    return res.data.map((item: any) => ({
      value: item.nutrientIT, // o altra proprietà descrittiva da mostrare
      label: item.nutrientId, // l'id univoco che vuoi usare come value
    }));
  },

  createProduct: async (payload: ProductCreatePayload) => {
    console.log("payload inviato", payload)
    return api.post('/products/create', payload);
  },
};
