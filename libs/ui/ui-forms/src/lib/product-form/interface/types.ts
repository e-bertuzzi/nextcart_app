export interface Option {
  label: string;
  value: string;
}

// Tipo per il form, con solo ID come stringhe (più semplice da gestire in UI)
export interface ProductFormState {
  productId: string;
  name?: string;
  itName?: string;
  productCategoryId?: string;
  productClaimIds: string[];
  productAllergenIds: string[];
  productDietIds: string[];
  nutritionalInfoIds: string[];
}

// Tipo per il backend (payload da inviare)
export interface ProductCreatePayload {
  productId: string;
  name?: string;
  itName?: string;
  productCategory?: { id: string };
  productClaims?: { id: string }[];
  productAllergens?: { id: string }[];
  productDiets?: { id: string }[];
  nutritionalInformationValues?: { id: string }[];
}
