import {
  AppLayout,
  ContentLayout,
  Spinner,
  SpaceBetween,
  ExpandableSection,
} from '@cloudscape-design/components';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/use-product-details';
import { ProductDetailSection } from '../components/product-detail-section';
import { ProductClaims } from '../components/product-claims';
import { ProductAllergens } from '../components/product-allergen';
import { ProductDiets } from '../components/product-diet';
import { ProductNutritionalTable } from '../components/product-nutritional-table';
//import { ProductAllergens } from '@/components/ProductAllergens';
//import { ProductDiets } from '@/components/ProductDiets';
//import { ProductNutritionalTable } from '@/components/ProductNutritionalTable';

export function UiProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { product, loading } = useProductDetails(productId || '');

  if (!productId) {
    return <div>Product ID not provided</div>;
  }

  if (loading) return <Spinner />;

  if (!product) return <div>Product not found</div>;

  return (
    <AppLayout
      content={
        <ContentLayout header={<h1>Product Detail</h1>}>
          <SpaceBetween size="l">
            <ProductDetailSection product={product} />

            {/* Metti i componenti in colonna, uno sotto l’altro */}
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
      navigationHide // <== Nasconde la colonna di navigazione
      toolsHide // <== Nasconde la colonna strumenti laterale
      disableContentPaddings
    />
  );
}
