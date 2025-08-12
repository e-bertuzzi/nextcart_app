import {
  AppLayout,
  ContentLayout,
  Spinner,
  SpaceBetween,
  ExpandableSection,
  Button,
  Modal,
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

export function UiProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const {
    product,
    loading,
    showDeleteModal,
    isDeleting,
    confirmDelete,
    cancelDelete,
    handleDelete,
  } = useProductDetails(productId || '');
  const { user } = useUser();

  if (!productId) return <div>Product ID not provided</div>;
  if (loading) return <Spinner />;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <AppLayout
        content={
          <ContentLayout
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {user?.role === Role.isAdmin && (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => window.location.assign(`/products/${productId}/edit`)}
                    >
                      Edit Product
                    </Button>
                    <Button
                      variant="normal"
                      onClick={confirmDelete}
                    >
                      Delete Product
                    </Button>
                  </>
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

      {showDeleteModal && (
        <Modal
          visible={showDeleteModal}
          onDismiss={cancelDelete}
          header="Conferma eliminazione"
          footer={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDelete}
                loading={isDeleting}
              >
                Delete
              </Button>
            </SpaceBetween>
          }
        >
          Are you sure you want to delete the product <b>{product.name}</b>?  
          This action cannot be undone.
        </Modal>
      )}
    </>
  );
}
