export interface CreateProductDto {
  productId: string;
  name?: string;
  itName?: string;
  productCategoryId?: string;
  productClaimIds?: string[];
  productAllergenIds?: string[];
  productDietIds?: string[];
  nutritionalInfoIds?: string[];
}
