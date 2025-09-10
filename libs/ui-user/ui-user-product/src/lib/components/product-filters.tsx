import {
  Box,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Stack,
  Divider,
  Paper,
} from '@mui/material';

export function ProductFilters({
  categories,
  selectedCategories,
  setSelectedCategories,
  diets,
  selectedDiets,
  setSelectedDiets,
  allergens,
  selectedAllergens,
  setSelectedAllergens,
  nutrientConstraints,
  selectedNutrientConstraints,
  setSelectedNutrientConstraints,
  onReset,
}: {
  categories: { label: string; value: string }[];
  selectedCategories: { label: string; value: string }[];
  setSelectedCategories: (value: { label: string; value: string }[]) => void;
  diets: { label: string; value: string }[];
  selectedDiets: { label: string; value: string }[];
  setSelectedDiets: (value: { label: string; value: string }[]) => void;
  allergens: { label: string; value: string }[];
  selectedAllergens: { label: string; value: string }[];
  setSelectedAllergens: (value: { label: string; value: string }[]) => void;
  nutrientConstraints: {
    nutrientId: string;
    minQuantity?: number;
    maxQuantity?: number;
    nutrient: {
      nutrientId: string;
      nutrientIT: string;
      unitOfMeasure?: string;
    };
  }[];
  selectedNutrientConstraints: { label: string; value: string }[];
  setSelectedNutrientConstraints: (
    value: { label: string; value: string }[]
  ) => void;
  onReset: () => void;
}) {
  const renderValue = (
    selected: string[],
    options: { label: string; value: string }[]
  ) =>
    selected
      .map((val) => options.find((o) => o.value === val)?.label)
      .filter(Boolean)
      .join(', ');

  return (
    <Paper sx={{ p: 3, bgcolor: 'white' }}>
      <Stack spacing={3}>
        {/* Categories */}
        <FormControl fullWidth>
          <InputLabel id="categories-label">Filter by category</InputLabel>
          <Select
            labelId="categories-label"
            multiple
            value={selectedCategories.map((c) => c.value)}
            onChange={(e) =>
              setSelectedCategories(
                (e.target.value as string[]).map((val) => {
                  const opt = categories.find((c) => c.value === val)!;
                  return { label: opt.label, value: opt.value };
                })
              )
            }
            input={<OutlinedInput label="Filter by category" />}
            renderValue={(selected) =>
              renderValue(selected as string[], categories)
            }
          >
            {categories.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                <Checkbox
                  checked={selectedCategories.some(
                    (c) => c.value === opt.value
                  )}
                />
                <ListItemText primary={opt.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Diets */}
        <FormControl fullWidth>
          <InputLabel id="diets-label">Filter by diet</InputLabel>
          <Select
            labelId="diets-label"
            multiple
            value={selectedDiets.map((d) => d.value)}
            onChange={(e) =>
              setSelectedDiets(
                (e.target.value as string[]).map((val) => {
                  const opt = diets.find((d) => d.value === val)!;
                  return { label: opt.label, value: opt.value };
                })
              )
            }
            input={<OutlinedInput label="Filter by diet" />}
            renderValue={(selected) => renderValue(selected as string[], diets)}
          >
            {diets.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                <Checkbox
                  checked={selectedDiets.some((d) => d.value === opt.value)}
                />
                <ListItemText primary={opt.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Allergens */}
        <FormControl fullWidth>
          <InputLabel id="allergens-label">Filter by allergen</InputLabel>
          <Select
            labelId="allergens-label"
            multiple
            value={selectedAllergens.map((a) => a.value)}
            onChange={(e) =>
              setSelectedAllergens(
                (e.target.value as string[]).map((val) => {
                  const opt = allergens.find((a) => a.value === val)!;
                  return { label: opt.label, value: opt.value };
                })
              )
            }
            input={<OutlinedInput label="Filter by allergen" />}
            renderValue={(selected) =>
              renderValue(selected as string[], allergens)
            }
          >
            {allergens.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                <Checkbox
                  checked={selectedAllergens.some((a) => a.value === opt.value)}
                />
                <ListItemText primary={opt.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Nutrient Constraints */}
        <FormControl fullWidth>
          <InputLabel id="nutrients-label">
            Filter by nutrient constraints
          </InputLabel>
          <Select
            labelId="nutrients-label"
            multiple
            value={selectedNutrientConstraints.map((n) => n.value)}
            onChange={(e) =>
              setSelectedNutrientConstraints(
                (e.target.value as string[]).map((val) => {
                  const opt = nutrientConstraints.find(
                    (c) => c.nutrientId === val
                  )!;
                  return {
                    label: `${opt.nutrient.nutrientIT} (min: ${
                      opt.minQuantity ?? '-'
                    }, max: ${opt.maxQuantity ?? '-'}) ${
                      opt.nutrient.unitOfMeasure ?? ''
                    }`,
                    value: opt.nutrientId,
                  };
                })
              )
            }
            input={<OutlinedInput label="Filter by nutrient constraints" />}
            renderValue={(selected) =>
              renderValue(
                selected as string[],
                nutrientConstraints.map((c) => ({
                  label: `${c.nutrient.nutrientIT} (min: ${
                    c.minQuantity ?? '-'
                  }, max: ${c.maxQuantity ?? '-'}) ${
                    c.nutrient.unitOfMeasure ?? ''
                  }`,
                  value: c.nutrientId,
                }))
              )
            }
          >
            {nutrientConstraints.map((c) => (
              <MenuItem key={c.nutrientId} value={c.nutrientId}>
                <Checkbox
                  checked={selectedNutrientConstraints.some(
                    (n) => n.value === c.nutrientId
                  )}
                />
                <ListItemText
                  primary={`${c.nutrient.nutrientIT} (min: ${
                    c.minQuantity ?? '-'
                  }, max: ${c.maxQuantity ?? '-'}) ${
                    c.nutrient.unitOfMeasure ?? ''
                  }`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Button
            variant="outlined"
            onClick={onReset}
            sx={{
              color: '#BF4019', // colore del testo
              borderColor: '#BF4019', // colore del bordo
              '&:hover': {
                backgroundColor: '#ffece0', // opzionale, colore di sfondo al hover
                borderColor: '#BF4019',
              },
            }}
          >
            Reset filters
          </Button>
        </Box>

        <Divider />
      </Stack>
    </Paper>
  );
}
