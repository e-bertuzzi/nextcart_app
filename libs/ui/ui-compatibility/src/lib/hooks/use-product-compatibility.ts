export function useProductCompatibility(
  product: any,
  userDiets: { value: string }[]
): { compatible: boolean; incompatibleDiets: string[] } {
  const productDietLabels: string[] =
    product?.productDiets?.map((d: any) => d.dietId || d) || [];
  const userDietLabels = userDiets.map((d) => d.value);

  console.log('Checking product compatibility for:', product?.name);
  console.log('Product diets:', productDietLabels);
  console.log('User diets:', userDietLabels);

  if (userDietLabels.length === 0)
    return { compatible: true, incompatibleDiets: [] };

  // Se il prodotto non ha diete definite, consideralo compatibile
  if (productDietLabels.length === 0) {
    console.log('Product has no diet info, marking as compatible by default');
    return { compatible: true, incompatibleDiets: [] };
  }

  // Trova le diete dell’utente che NON sono supportate dal prodotto
  const incompatibleDiets = userDietLabels.filter(
    (diet) => !productDietLabels.includes(diet)
  );
  console.log('Incompatible diets:', incompatibleDiets);

  return {
    compatible: incompatibleDiets.length === 0,
    incompatibleDiets,
  };
}

export function useProductNutrientCompatibility(
  product: any,
  userNutrientConstraints: {
    nutrientId: string;
    minQuantity?: number;
    maxQuantity?: number;
  }[]
): { compatible: boolean; violatedNutrients: string[] } {
  console.log('Product nutrients raw:', product.nutritionalInformationValues);
  console.log('User constraints raw:', userNutrientConstraints);

  if (!userNutrientConstraints || userNutrientConstraints.length === 0) {
    return { compatible: true, violatedNutrients: [] };
  }

  const productNutrients = product.nutritionalInformationValues ?? [];
  const violatedNutrients: string[] = [];

  for (const constraint of userNutrientConstraints) {
    const prodNutrient = productNutrients.find(
      (n: any) => n.nutrient?.nutrientId === constraint.nutrientId
    );

    // Se il nutriente non esiste o non ha valore numerico → skip
    if (
      !prodNutrient ||
      prodNutrient.value === null ||
      prodNutrient.value === undefined ||
      prodNutrient.value === ''
    ) {
      continue;
    }

    const quantity = Number(prodNutrient.value);
    if (isNaN(quantity)) {
      continue;
    }

    if (
      (constraint.minQuantity != null && quantity < constraint.minQuantity) ||
      (constraint.maxQuantity != null && quantity > constraint.maxQuantity)
    ) {
      violatedNutrients.push(constraint.nutrientId);
    }
  }

  return {
    compatible: violatedNutrients.length === 0,
    violatedNutrients,
  };
}
