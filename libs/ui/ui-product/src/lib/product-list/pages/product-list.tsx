import {
  Cards,
  Container,
  Header,
  Box,
  Spinner,
  Alert,
  Button,
  ColumnLayout,
  Select,
  FormField,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useProducts } from '../hooks/use-products';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function UiProductList() {
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  if (loading) return <Spinner />;
  if (error) return <Alert type="error">{error}</Alert>;

  // 🧠 Estrai categorie uniche dai prodotti
  const categories = Array.from(
    new Set(products.map((p) => p.productCategory?.category).filter(Boolean))
  ).map((cat) => ({ label: cat }));

  // 🎯 Filtra i prodotti se è selezionata una categoria
  const filteredProducts = selectedCategory
    ? products.filter(
        (p) => p.productCategory?.category === selectedCategory.label
      )
    : products;

  return (
    <Container header={<Header variant="h1">Catalogo Prodotti</Header>}>
      <ColumnLayout columns={2} variant="text-grid">
        {/* 🧭 Sidebar filtraggio */}
        <SpaceBetween size="l">
          <FormField label="Filtra per categoria">
            <Select
              selectedOption={selectedCategory}
              onChange={({ detail }) => setSelectedCategory(detail.selectedOption)}
              options={categories}
              placeholder="Seleziona categoria"
              selectedAriaLabel="Selected"
              empty="Nessuna categoria disponibile"
              ariaLabel="Categoria"
            />
          </FormField>

          {selectedCategory && (
            <Button onClick={() => setSelectedCategory(null)} variant="link">
              Rimuovi filtro
            </Button>
          )}
        </SpaceBetween>

        {/* 📦 Cards prodotto */}
        <Cards
          items={filteredProducts}
          cardDefinition={{
            header: (item) => (
              <Box fontWeight="bold" fontSize="heading-m">
                {item.name || item.itName}
              </Box>
            ),
            sections: [
              {
                id: 'category',
                content: (item) => (
                  <Box color="text-body-secondary">
                    Categoria: {item.productCategory?.category ?? 'N/A'}
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
                    Dettagli
                  </Button>
                ),
              },
            ],
          }}
          loadingText="Caricamento prodotti..."
          empty="Nessun prodotto disponibile."
        />
      </ColumnLayout>
    </Container>
  );
}
