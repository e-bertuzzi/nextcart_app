import { useState, useEffect } from 'react';
import { productService } from '../service/product-service';
import {
  Option,
  ProductFormState,
  ProductCreatePayload,
} from '../interface/types';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { Diet } from '@nextcart/models';

export function useAddProduct() {
  const [formData, setFormData] = useState<ProductFormState>({
    productId: '',
    name: '',
    itName: '',
    productCategoryId: undefined,
    productClaimIds: [],
    productAllergenIds: [],
    productDietIds: [],
    nutritionalInfoIds: [],
  });

  const [categories, setCategories] = useState<Option[]>([]);
  const [claims, setClaims] = useState<Option[]>([]);
  const [allergens, setAllergens] = useState<Option[]>([]);
  const [diets, setDiets] = useState<Diet[]>([]); // dati originali
  const [dietOptions, setDietOptions] = useState<Option[]>([]); // opzioni per select
  const [nutritionalInfos, setNutritionalInfos] = useState<Option[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    content: string;
  } | null>(null);

  useEffect(() => {
    async function fetchOptions() {
      setLoading(true);
      try {
        // Categories
        const cat = await productService.getCategories();
        console.log('Categorie:', cat);
        setCategories(cat);

        // Claims
        const cl = await productService.getClaims();
        console.log('Claims:', cl);
        setClaims(cl);

        // Allergens
        const al = await productService.getAllergens();
        console.log('Allergens:', al);
        setAllergens(al);

        // Diets
        const di = await productService.getDiets();
        console.log('Diets (raw):', di);
        setDiets(di);

        const dietsOpts: Option[] = di.map((diet) => ({
          label: diet.dietId,
          value: diet.description,
        }));
        console.log('Diets (options):', dietsOpts);
        setDietOptions(dietsOpts);
        console.log('categories ', cat);

        // Nutritional infos
        const ni = await productService.getNutritionalInfos();
        console.log('Nutritional Infos:', ni);
        setNutritionalInfos(ni);
      } catch (error) {
        console.error('Errore durante fetchOptions:', error);
        setMessage({ type: 'error', content: 'Error loading options.' });
      } finally {
        setLoading(false);
      }
    }

    fetchOptions();
  }, []);

  const onChange = <K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const payload: ProductCreatePayload = {
        productId: formData.productId,
        name: formData.name,
        itName: formData.itName,
        productCategory: formData.productCategoryId
          ? { productCategoryId: formData.productCategoryId }
          : undefined,
        productClaims: formData.productClaimIds.map((claimId) => ({
          claim: { claimId }, // claimsId è il nome della PK della tua entity Claim
        })),
        productAllergens: formData.productAllergenIds.map((allergenId) => ({
          allergen: { allergenId },
        })),
        productDiets: formData.productDietIds.map((dietId) => ({
          dietId,
        })),
        nutritionalInformationValues: formData.nutritionalInfoIds.map((id) => ({
          id,
        })),
      };

      await productService.createProduct(payload);
      setMessage({ type: 'success', content: 'Product added successfully!' });
      setFormData({
        productId: '',
        name: '',
        itName: '',
        productCategoryId: undefined,
        productClaimIds: [],
        productAllergenIds: [],
        productDietIds: [],
        nutritionalInfoIds: [],
      });
    } catch (error) {
      setMessage({ type: 'error', content: 'Error adding product.' });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    message,
    onChange,
    handleSubmit,
    setMessage,
    categories,
    claims,
    allergens,
    diets, // dati originali (opzionale)
    dietOptions, // da usare nella UI per il multiselect
    nutritionalInfos,
  };
}
