import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Box,
  Divider,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useProducts } from '@nextcart/ui-product';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useUserDiets } from '@nextcart/ui-compatibility';
import { useDiets } from '@nextcart/ui-product';
import { useAllergens } from '@nextcart/ui-product';
import { useUserNutrientConstraints } from '@nextcart/ui-compatibility';

import { ProductFilters } from '../components/product-filters';
import { ProductCardList } from '../components/product-card-list';

export function UiProductList() {
  const { user, loading: loadingUser } = useUser();
  const {
    diets: allDietOptions,
    loading: loadingDiets,
    error: errorDiets,
  } = useDiets();
  const {
    allergens: allAllergenOptions,
    loading: loadingAllergens,
    error: errorAllergens,
  } = useAllergens();
  const {
    nutrientConstraints,
    loading: loadingNutrientConstraints,
    error: errorNutrientConstraints,
  } = useUserNutrientConstraints(user?.id);

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
  const [selectedAllergens, setSelectedAllergens] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedNutrientConstraints, setSelectedNutrientConstraints] =
    useState<{ label: string; value: string }[]>([]);

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
    loadingAllergens ||
    loadingNutrientConstraints
  ) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (
    error ||
    errorUserDiets ||
    errorDiets ||
    errorAllergens ||
    errorNutrientConstraints
  ) {
    return (
      <Alert severity="error">
        {error ||
          errorUserDiets ||
          errorDiets ||
          errorAllergens ||
          errorNutrientConstraints}
      </Alert>
    );
  }

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
      selectedAllergens.every(
        (allergen) =>
          !p.productAllergens?.some((pa) => pa.allergenId === allergen.value)
      );

    const matchesNutrientConstraint =
      selectedNutrientConstraints.length === 0 ||
      selectedNutrientConstraints.every((sel) => {
        const constraint = nutrientConstraints.find(
          (nc) => nc.nutrientId.toLowerCase() === sel.value.toLowerCase()
        );

        const pn = p.nutritionalInformationValues?.find((item) => {
          const id =
            (item as any).nutrient?.nutrientId ?? (item as any).nutrientId;
          return id?.toString().toLowerCase() === sel.value.toLowerCase();
        });

        if (!constraint || !pn) return false;

        const rawValue =
          (pn as any).value ?? (pn as any).quantity ?? (pn as any).amount;

        const nutrientValue = Number(rawValue);

        const minOk =
          constraint.minQuantity == null ||
          nutrientValue >= constraint.minQuantity;
        const maxOk =
          constraint.maxQuantity == null ||
          nutrientValue <= constraint.maxQuantity;

        return minOk && maxOk;
      });

    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.itName?.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesCategory &&
      matchesDiet &&
      matchesAllergen &&
      matchesNutrientConstraint &&
      matchesSearch
    );
  });

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedDiets([]);
    setSelectedAllergens([]);
    setSelectedNutrientConstraints([]);
    setInitialized(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Product catalog
      </Typography>

      <TextField
        fullWidth
        label="Search product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by product name"
        type="search"
        margin="normal"
      />

      <Divider sx={{ my: 3 }} />

      <ProductFilters
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        diets={allDietOptions}
        selectedDiets={selectedDiets}
        setSelectedDiets={setSelectedDiets}
        allergens={allAllergenOptions}
        selectedAllergens={selectedAllergens}
        setSelectedAllergens={setSelectedAllergens}
        nutrientConstraints={nutrientConstraints}
        selectedNutrientConstraints={selectedNutrientConstraints}
        setSelectedNutrientConstraints={setSelectedNutrientConstraints}
        onReset={handleResetFilters}
      />

      <Box mt={4}>
        <ProductCardList products={filteredProducts} userDiets={userDiets} />
      </Box>
    </Container>
  );
}
