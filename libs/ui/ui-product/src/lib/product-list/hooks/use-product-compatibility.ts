export function useProductCompatibility(
  product: any,
  userDiets: { value: string }[]
): { compatible: boolean; incompatibleDiets: string[] } {
  const productDietLabels: string[] = product?.productDiets?.map((d: any) => d.dietId || d) || [];
  const userDietLabels = userDiets.map((d) => d.value);

  if (userDietLabels.length === 0) return { compatible: true, incompatibleDiets: [] };
  if (productDietLabels.length === 0) return { compatible: false, incompatibleDiets: userDietLabels };

  // Trova le diete dell’utente che NON sono supportate dal prodotto
  const incompatibleDiets = userDietLabels.filter(diet => !productDietLabels.includes(diet));

  return {
    compatible: incompatibleDiets.length === 0,
    incompatibleDiets,
  };
}

export function useProductNutrientCompatibility(
  product: any,
  userNutrientConstraints: { nutrientId: string; minQuantity?: number; maxQuantity?: number }[]
): { compatible: boolean; violatedNutrients: string[] } {

  console.log('Product nutrients raw:', product.nutritionalInformationValues);
  console.log('User constraints raw:', userNutrientConstraints);

  if (!userNutrientConstraints || userNutrientConstraints.length === 0) {
    return { compatible: true, violatedNutrients: [] };
  }

  const productNutrients = product.nutritionalInformationValues ?? [];
  const violatedNutrients: string[] = [];

  for (const constraint of userNutrientConstraints) {
    // Qui accediamo correttamente all'id del nutriente
    const prodNutrient = productNutrients.find(
      (n: any) => n.nutrient?.id === constraint.nutrientId
    );

    // Qui prendiamo il valore reale del nutriente
    const quantity = prodNutrient?.value ?? 0;

    if (
      (constraint.minQuantity != null && quantity < constraint.minQuantity) ||
      (constraint.maxQuantity != null && quantity > constraint.maxQuantity)
    ) {
      violatedNutrients.push(constraint.nutrientId);
    }
  }

  const compatible = violatedNutrients.length === 0;
  return {
    compatible,
    violatedNutrients,
  };
}




