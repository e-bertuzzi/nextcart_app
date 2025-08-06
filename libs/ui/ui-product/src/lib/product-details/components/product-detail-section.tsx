import { Container, Header, SpaceBetween, Box } from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';

export function ProductDetailSection({ product }: { product: Product }) {
  return (
    <Container
      header={<Header variant="h2">{product.itName || product.name}</Header>}
    >
      <SpaceBetween size="m">
        <Box>Categoria: {product.productCategory?.category || 'N/A'}</Box>
        <Box>ID prodotto: {product.productId}</Box>
      </SpaceBetween>
    </Container>
  );
}
