import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useProductDetails } from '@nextcart/ui-product';
import { ProductDetailSection } from '../components/product-detail-section';
import { ProductClaims } from '../components/product-claim';
import { ProductAllergens } from '../components/product-allergen';
import { ProductDiets } from '../components/product-diet';
import { ProductNutritionalTable } from '../components/product-nutritional-table';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Role } from '@nextcart/enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function UiProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

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

  if (!productId) return <Typography>Product ID not provided</Typography>;
  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Box p={2}>
      {/* Header con pulsanti Back/Edit/Delete */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        {/*
        <Button variant="text" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
        */}
        {/*
        {user?.role === Role.isAdmin && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                window.location.assign(`/products/${productId}/edit`)
              }
            >
              Edit Product
            </Button>
            <Button variant="outlined" color="error" onClick={confirmDelete}>
              Delete Product
            </Button>
          </>
        )}*/}
      </Box>

      <Stack spacing={3}>
        <ProductDetailSection product={product} />

        <Accordion>
          <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
            <Typography>Diets</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProductDiets diets={product.productDiets || []} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
            <Typography>Nutritional Values</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProductNutritionalTable
              nutritionalInfo={product.nutritionalInformationValues || []}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
            <Typography>Claim</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProductClaims claims={product.productClaims || []} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
            <Typography>Allergens</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProductAllergens allergens={product.productAllergens || []} />
          </AccordionDetails>
        </Accordion>
      </Stack>

      {/* Modal di conferma cancellazione */}
      <Dialog open={showDeleteModal} onClose={cancelDelete}>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the product{' '}
          <b>{product.name}</b>? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
