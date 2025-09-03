import { Box, Typography, Container, Stack } from '@mui/material';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';

interface Props {
  product: Product;
}

export function ProductDetailSection({ product }: Props) {
  return (
    <Container maxWidth="sm">
      {/* Nome prodotto più elegante */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 700,
          letterSpacing: '0.5px',
          color: 'text.primary',
          marginBottom: 2,
        }}
      >
        {product.name || product.itName}
      </Typography>

      {/* Box con sfondo bianco e padding */}
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="body1" fontWeight={500}>
            IT Name: {product.itName || 'N/A'}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            Category: {product.productCategory?.category || 'N/A'}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            ID product: {product.productId}
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
}
