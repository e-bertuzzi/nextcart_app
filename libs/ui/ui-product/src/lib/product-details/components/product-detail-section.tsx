import { Container, Header, SpaceBetween, Box } from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';

export function ProductDetailSection({ product }: { product: Product }) {
  return (
    <Container
      header={<Header variant="h2">{product.name || product.itName}</Header>}
    >
      <SpaceBetween size="m">
        <Box>IT Name: {product.itName || 'N/A'}</Box>
        <Box>Category: {product.productCategory?.category || 'N/A'}</Box>
        <Box>ID product: {product.productId}</Box>
      </SpaceBetween>
    </Container>
  );
}
