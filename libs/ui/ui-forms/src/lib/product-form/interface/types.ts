export interface Option {
  label: string;
  value: string;
}

export interface NutritionalValue {
  nutrientId: string;
  value: string;
}

export interface NutritionalInfoOption extends Option {
  unitOfMeasure: string;
}

export interface ProductFormState {
  productId: string;
  name?: string;
  itName?: string;
  productCategoryId?: string;
  productClaimIds: string[];
  productAllergenIds: string[];
  productDietIds: string[];
  nutritionalInfoValues: NutritionalValue[];
}

// Tipo per il backend (payload da inviare)
export interface ProductCreatePayload {
  productId: string;
  name?: string;
  itName?: string;
  productCategory?: { productCategoryId: string };
  productClaims?: { claim: { claimId: string } }[];
  productAllergens?: { allergen: { allergenId: string } }[];
  productDiets?: { dietId: string }[];
  nutritionalInformationValues?: {
    id: string;   // nutrientId o id del nutrient
    value: number;
  }[];
}

export interface ProductUpdatePayload {
  name?: string;
  itName?: string;
  productCategory?: { productCategoryId: string };
  productClaims?: { claim: { claimId: string } }[];
  productAllergens?: { allergen: { allergenId: string } }[];
  productDiets?: { dietId: string }[];
  nutritionalInformationValues?: {
    id: string;
    value: number;
  }[];
}


