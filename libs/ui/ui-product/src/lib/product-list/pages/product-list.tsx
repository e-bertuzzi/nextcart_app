// UiProductList.tsx
import {
  Container,
  Header,
  Spinner,
  Alert,
  Input,
  FormField,
} from '@cloudscape-design/components';
import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/use-products';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useUserDiets } from '../hooks/use-user-diets';
import { useDiets } from '../hooks/use-diets';

import { ProductFilters } from '../components/product-filters';
import { ProductCardList } from '../components/product-card-list';

export function UiProductList() {
  const { user, loading: loadingUser } = useUser();
  const {
    diets: allDietOptions,
    loading: loadingDiets,
    error: errorDiets,
  } = useDiets();
  const userId = user?.id;

  const [searchQuery, setSearchQuery] = useState('');

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
  ).map((cat) => ({
    label: cat as string,
    value: cat as string,
  }));

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

    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.itName?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDiet && matchesSearch;
  });

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedDiets([]);
    setInitialized(false);
  };

  return (
    <Container header={<Header variant="h1">Catalogo Prodotti</Header>}>
      <FormField label="Cerca prodotto">
        <Input
          value={searchQuery}
          onChange={({ detail }) => setSearchQuery(detail.value)}
          placeholder="Cerca per nome prodotto"
          type="search"
        />
      </FormField>

      <hr style={{ marginTop: '1.5rem', marginBottom: '1.5rem', border: 'none', borderTop: '1px solid #ccc' }} />

      <ProductFilters
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        diets={allDietOptions}
        selectedDiets={selectedDiets}
        setSelectedDiets={setSelectedDiets}
        onReset={handleResetFilters}
      />

      <ProductCardList products={filteredProducts} />
    </Container>
  );
}
