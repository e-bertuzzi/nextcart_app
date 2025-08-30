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
