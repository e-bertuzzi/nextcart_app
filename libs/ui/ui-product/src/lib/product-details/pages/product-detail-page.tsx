import {
  AppLayout,
  ContentLayout,
  Spinner,
  SpaceBetween,
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
    return <div>ID prodotto non fornito</div>;
  }

  if (loading) return <Spinner />;

  if (!product) return <div>Prodotto non trovato</div>;

  return (
    <AppLayout
      content={
        <ContentLayout header={<h1>Dettaglio Prodotto</h1>}>
          <SpaceBetween size="l">
            <ProductDetailSection product={product} />

            {/* Metti i componenti in colonna, uno sotto l’altro */}
            <ProductClaims claims={product.productClaims || []} />
            {/* Puoi aggiungere gli altri componenti in colonna qui */}
            {<ProductAllergens allergens={product.productAllergens || []} /> }
            {<ProductDiets diets={product.productDiets || []} /> }
            {<ProductNutritionalTable nutritionalInfo={product.nutritionalInformationValues || []} /> }
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
