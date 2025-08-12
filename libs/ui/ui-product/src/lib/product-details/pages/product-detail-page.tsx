import {
  AppLayout,
  ContentLayout,
  Spinner,
  SpaceBetween,
  ExpandableSection,
  Button,
  Modal,
} from '@cloudscape-design/components';
import { useParams, useNavigate } from 'react-router-dom';
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
import { useState } from 'react';
import { deleteProduct } from '../service'; // <-- da creare/importare

export function UiProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { product, loading } = useProductDetails(productId || '');
  const { user } = useUser();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(productId!);
      navigate('/products');
    } catch (err) {
      console.error('Errore durante l\'eliminazione:', err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

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
                      onClick={() => navigate(`/products/${productId}/edit`)}
                    >
                      Edit Product
                    </Button>
                    <Button
                      variant="normal"
                      onClick={() => setShowDeleteModal(true)}
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
          onDismiss={() => setShowDeleteModal(false)}
          header="Conferma eliminazione"
          footer={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setShowDeleteModal(false)}>
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
