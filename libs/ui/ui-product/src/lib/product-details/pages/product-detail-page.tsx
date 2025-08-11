import {
  AppLayout,
  ContentLayout,
  Spinner,
  SpaceBetween,
  ExpandableSection,
  Button,
} from '@cloudscape-design/components';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/use-product-details';
import { ProductDetailSection } from '../components/product-detail-section';
import { ProductClaims } from '../components/product-claims';
import { ProductAllergens } from '../components/product-allergen';
import { ProductDiets } from '../components/product-diet';
import { ProductNutritionalTable } from '../components/product-nutritional-table';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Role } from '@nextcart/enum';
import { useNavigate } from 'react-router-dom';

//import { ProductAllergens } from '@/components/ProductAllergens';
//import { ProductDiets } from '@/components/ProductDiets';
//import { ProductNutritionalTable } from '@/components/ProductNutritionalTable';

import React from 'react';
// ... altri import rimangono uguali

export function UiProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { product, loading } = useProductDetails(productId || '');
  const { user } = useUser();
  const navigate = useNavigate();

  if (!productId) {
    return <div>Product ID not provided</div>;
  }

  if (loading) return <Spinner />;

  if (!product) return <div>Product not found</div>;

  return (
    <AppLayout
      content={
        <ContentLayout
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {user?.role === Role.isAdmin && (
                <Button
                  variant="primary"
                  onClick={() => navigate(`/products/${productId}/edit`)}
                >
                  Edit Product
                </Button>
              )}
            </div>
          }
        >
          <SpaceBetween size="l">
            <ProductDetailSection product={product} />

            <ExpandableSection headerText="Claim">
              <ProductClaims claims={product.productClaims || []} />
            </ExpandableSection>

            <ExpandableSection headerText="Allergens">
              <ProductAllergens allergens={product.productAllergens || []} />
            </ExpandableSection>

            <ExpandableSection headerText="Diets">
              <ProductDiets diets={product.productDiets || []} />
            </ExpandableSection>

            <ExpandableSection headerText="Nutritional Values">
              <ProductNutritionalTable
                nutritionalInfo={product.nutritionalInformationValues || []}
              />
            </ExpandableSection>
          </SpaceBetween>
        </ContentLayout>
      }
      navigationHide
      toolsHide
      disableContentPaddings
    />
  );
}
