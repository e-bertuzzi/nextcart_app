import {
  Cards,
  Container,
  Header,
  Box,
  Spinner,
  Alert,
  Button,
  Multiselect,
  FormField,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useProducts } from '../hooks/use-products';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useUserDiets } from '../hooks/use-user-diets';
import { useDiets } from '../hooks/use-diets';

export function UiProductList() {
  const { user, loading: loadingUser } = useUser();
  const {
    diets: allDietOptions,
    loading: loadingDiets,
    error: errorDiets,
  } = useDiets();
  const userId = user?.id;

  const {
    userDiets,
    loading: loadingUserDiets,
    error: errorUserDiets,
  } = useUserDiets(userId);

  const { products, loading, error } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedDiets, setSelectedDiets] = useState<
    { label: string; value: string }[]
  >([]);
  const [initialized, setInitialized] = useState(false);

  const navigate = useNavigate();

  console.log("userDiets:", userDiets);
  console.log("allDietOptions:", allDietOptions);


  // Imposta diete dell'utente solo una volta
  useEffect(() => {
    if (!initialized && userDiets.length > 0) {
      setSelectedDiets(userDiets);
      setInitialized(true);
    }
  }, [userDiets, initialized]);

  if (loadingUser || loadingUserDiets || loading || loadingDiets)
    return <Spinner />;

  if (error || errorUserDiets || errorDiets)
    return <Alert type="error">{error || errorUserDiets || errorDiets}</Alert>;

  const categories = Array.from(
    new Set(products.map((p) => p.productCategory?.category).filter(Boolean))
  ).map((cat) => ({ label: cat, value: cat }));

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (cat) => cat.value === p.productCategory?.category
      );

    const matchesDiet =
      selectedDiets.length === 0 ||
      selectedDiets.every((sel) =>
        p.productDiets?.some((pd) => pd.dietId === sel.value)
      );

    return matchesCategory && matchesDiet;
  });

  return (
    <Container header={<Header variant="h1">Catalogo Prodotti</Header>}>
      <SpaceBetween size="l">
        <FormField label="Filtra per categoria">
          <Multiselect
            options={categories}
            selectedOptions={selectedCategories}
            onChange={({ detail }) =>
              setSelectedCategories([...detail.selectedOptions])
            }
            placeholder="Seleziona categorie"
            selectedAriaLabel="Categorie selezionate"
            empty="Nessuna categoria disponibile"
            ariaLabel="Categoria"
          />
        </FormField>

        <FormField label="Filtra per dieta">
          <Multiselect
            options={allDietOptions}
            selectedOptions={selectedDiets}
            onChange={({ detail }) =>
              setSelectedDiets(
                detail.selectedOptions
                  .filter(
                    (opt): opt is { label: string; value: string } =>
                      !!opt.label
                  )
                  .map((opt) => ({
                    label: opt.label!,
                    value: opt.value,
                  }))
              )
            }
            placeholder="Seleziona diete"
            selectedAriaLabel="Diete selezionate"
            empty="Nessuna dieta disponibile"
            ariaLabel="Dieta"
          />
        </FormField>

        {(
          <Button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedDiets([]);
              setInitialized(false); // resetta per ricaricare le diete utente
            }}
            variant="link"
          >
            Reset filtri
          </Button>
        )}

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
      </SpaceBetween>
    </Container>
  );
}
