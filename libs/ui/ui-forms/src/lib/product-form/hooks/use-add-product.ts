import { useState, useEffect } from 'react';
import { productService } from '../service/product-service';
import {
  Option,
  ProductFormState,
  ProductCreatePayload,
  NutritionalInfoOption,
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
    nutritionalInfoValues: [],
  });

  const [categories, setCategories] = useState<Option[]>([]);
  const [claims, setClaims] = useState<Option[]>([]);
  const [allergens, setAllergens] = useState<Option[]>([]);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [dietOptions, setDietOptions] = useState<Option[]>([]);
  const [nutritionalInfos, setNutritionalInfos] = useState<
    NutritionalInfoOption[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    content: string;
  } | null>(null);

  useEffect(() => {
    async function fetchOptions() {
      setLoading(true);
      try {
        const cat = await productService.getCategories();
        setCategories(cat);

        const cl = await productService.getClaims();
        setClaims(cl);

        const al = await productService.getAllergens();
        setAllergens(al);

        const di = await productService.getDiets();
        setDietOptions(di);

        const niRaw = await productService.getNutritionalInfos();
        console.log("niraw", niRaw);
        const niMapped: NutritionalInfoOption[] = niRaw.map((item: any) => ({
          label: item.label,
          value: item.value,
          unitOfMeasure: item.unitOfMeasure,
        }));
        console.log("nutr", niMapped);
        setNutritionalInfos(niMapped);
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
          claim: { claimId },
        })),
        productAllergens: formData.productAllergenIds.map((allergenId) => ({
          allergen: { allergenId },
        })),
        productDiets: formData.productDietIds.map((dietId) => ({
          dietId,
        })),
        nutritionalInformationValues: formData.nutritionalInfoValues
          .filter((v) => v.value !== '' && !isNaN(Number(v.value)))
          .map((v) => ({
            id: v.nutrientId, // usa id come richiesto dal nuovo tipo
            value: Number(v.value),
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
        nutritionalInfoValues: [],
      });
    } catch (error) {
      console.error(error);
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
    diets,
    dietOptions,
    nutritionalInfos,
  };
}
