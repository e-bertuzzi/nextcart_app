// components/ProductFilters.tsx
import {
  FormField,
  Multiselect,
  Button,
  SpaceBetween,
} from '@cloudscape-design/components';

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
  nutrientConstraints, // nuovo
  selectedNutrientConstraints, // nuovo
  setSelectedNutrientConstraints, // nuovo
  onReset,
}: {
  categories: { label: string; value: string }[];
  selectedCategories: any[];
  setSelectedCategories: (value: any[]) => void;
  diets: { label: string; value: string }[];
  selectedDiets: { label: string; value: string }[];
  setSelectedDiets: (value: { label: string; value: string }[]) => void;
  allergens: { label: string; value: string }[];
  selectedAllergens: { label: string; value: string }[];
  setSelectedAllergens: (value: { label: string; value: string }[]) => void;
  nutrientConstraints: {
    nutrientId: string;
    nutrientName: string;
    minQuantity?: number;
    maxQuantity?: number;
  }[]; // nuovo
  selectedNutrientConstraints: { label: string; value: string }[]; // nuovo
  setSelectedNutrientConstraints: (
    value: { label: string; value: string }[]
  ) => void; // nuovo
  onReset: () => void;
}) {
  return (
    <SpaceBetween size="l">
      <FormField label="Filter by category">
        <Multiselect
          options={categories}
          selectedOptions={selectedCategories}
          onChange={({ detail }) =>
            setSelectedCategories([...detail.selectedOptions])
          }
          placeholder="Select categories"
          selectedAriaLabel="Selected categories"
          empty="No categories available"
          ariaLabel="Category"
        />
      </FormField>

      <FormField label="Filter by diet">
        <Multiselect
          options={diets}
          selectedOptions={selectedDiets}
          onChange={({ detail }) =>
            setSelectedDiets(
              detail.selectedOptions
                .filter(
                  (opt): opt is { label: string; value: string } => !!opt.label
                )
                .map((opt) => ({
                  label: opt.label!,
                  value: opt.value,
                }))
            )
          }
          placeholder="Select diets"
          selectedAriaLabel="Selected diets"
          empty="No diet available"
          ariaLabel="Diet"
        />
      </FormField>

      <FormField label="Filter by allergen">
        <Multiselect
          options={allergens}
          selectedOptions={selectedAllergens}
          onChange={({ detail }) =>
            setSelectedAllergens(
              detail.selectedOptions
                .filter(
                  (opt): opt is { label: string; value: string } => !!opt.label
                )
                .map((opt) => ({
                  label: opt.label!,
                  value: opt.value,
                }))
            )
          }
          placeholder="Select allergens"
          selectedAriaLabel="Selected allergens"
          empty="No allergens available"
          ariaLabel="Allergen"
        />
      </FormField>

      {/* Nuovo filtro per vincoli nutrizionali */}
      <FormField label="Filter by nutrient constraints">
        <Multiselect
          options={nutrientConstraints.map((c) => ({
            label: `${c.nutrientId} (${c.minQuantity ?? '-'} / ${
              c.maxQuantity ?? '-'
            })`,
            value: c.nutrientId,
          }))}
          selectedOptions={selectedNutrientConstraints}
          onChange={({ detail }) =>
            setSelectedNutrientConstraints(
              detail.selectedOptions
                .filter(
                  (opt): opt is { label: string; value: string } => !!opt.label
                )
                .map((opt) => ({
                  label: opt.label!,
                  value: opt.value,
                }))
            )
          }
          placeholder="Select nutrient constraints"
          selectedAriaLabel="Selected nutrient constraints"
          empty="No nutrient constraints available"
          ariaLabel="Nutrient constraints"
        />
      </FormField>

      <Button onClick={onReset}>Reset filters</Button>
      <hr
        style={{
          marginTop: '1rem',
          marginBottom: '1rem',
          border: 'none',
          borderTop: '1px solid #ccc',
        }}
      />
    </SpaceBetween>
  );
}
