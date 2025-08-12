// components/ProductCardList.tsx
import { Cards, Box, Button } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export function ProductCardList({ products }: { products: any[] }) {
  const navigate = useNavigate();

  return (
    <Cards
      items={products}
      cardDefinition={{
        header: (item) => (
          <Box fontWeight="bold" fontSize="heading-m">
            {item.name || item.itName} <Box fontWeight="light">ID: {item.productId}</Box>
          </Box>
        ),
        sections: [
          {
            id: 'category',
            content: (item) => (
              <Box color="text-body-secondary">
                Category: {item.productCategory?.category ?? 'N/A'}
              </Box>
            ),
          },
          {
            id: 'actions',
            content: (item) => (
              <Button
                variant="primary"
                onClick={() => navigate(`/products/${item.productId}`)}
              >
                Details
              </Button>
            ),
          },
        ],
      }}
      loadingText="Caricamento prodotti..."
      empty="Nessun prodotto disponibile."
    />
  );
}
