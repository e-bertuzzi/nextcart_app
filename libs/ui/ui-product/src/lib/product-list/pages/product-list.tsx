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
import { useAllergens } from '../hooks/use-allergens'; // import nuovo hook

import { ProductFilters } from '../components/product-filters';
import { ProductCardList } from '../components/product-card-list';

export function UiProductList() {
  const { user, loading: loadingUser } = useUser();
  const {
    diets: allDietOptions,
    loading: loadingDiets,
    error: errorDiets,
  } = useDiets();
  const { allergens: allAllergenOptions, loading: loadingAllergens, error: errorAllergens } = useAllergens(); // nuovo hook

  const userId = user?.id;
  const [searchQuery, setSearchQuery] = useState('');

  const {
    userDiets,
    loading: loadingUserDiets,
    error: errorUserDiets,
  } = useUserDiets(userId);

  const { products, loading, error } = useProducts();

  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedDiets, setSelectedDiets] = useState<{ label: string; value: string }[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<{ label: string; value: string }[]>([]); // stato allergeni

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && userDiets.length > 0) {
      setSelectedDiets(userDiets);
      setInitialized(true);
    }
  }, [userDiets, initialized]);

  if (
    loadingUser ||
    loadingUserDiets ||
    loading ||
    loadingDiets ||
    loadingAllergens // considera anche caricamento allergeni
  )
    return <Spinner />;

  if (error || errorUserDiets || errorDiets || errorAllergens)
    return <Alert type="error">{error || errorUserDiets || errorDiets || errorAllergens}</Alert>;

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

    const matchesAllergen =
      selectedAllergens.length === 0 ||
      // escludi prodotti che contengono allergeni selezionati
      selectedAllergens.every(
        (allergen) =>
          !p.productAllergens?.some(
            (pa) => pa.allergenId === allergen.value
          )
      );

    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.itName?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDiet && matchesAllergen && matchesSearch;
  });

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedDiets([]);
    setSelectedAllergens([]); // reset allergeni
    setInitialized(false);
  };

  return (
    <Container header={<Header variant="h1">Product catalog</Header>}>
      <FormField label="Search product">
        <Input
          value={searchQuery}
          onChange={({ detail }) => setSearchQuery(detail.value)}
          placeholder="Search by product name"
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
        allergens={allAllergenOptions} // passa allergeni a ProductFilters
        selectedAllergens={selectedAllergens}
        setSelectedAllergens={setSelectedAllergens}
        onReset={handleResetFilters}
      />

      <ProductCardList products={filteredProducts} />
    </Container>
  );
}
