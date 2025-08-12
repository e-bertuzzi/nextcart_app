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
  allergens, // nuovo
  selectedAllergens, // nuovo
  setSelectedAllergens, // nuovo
  onReset,
}: {
  categories: { label: string; value: string }[];
  selectedCategories: any[];
  setSelectedCategories: (value: any[]) => void;
  diets: { label: string; value: string }[];
  selectedDiets: { label: string; value: string }[];
  setSelectedDiets: (value: { label: string; value: string }[]) => void;
  allergens: { label: string; value: string }[]; // nuovo
  selectedAllergens: { label: string; value: string }[]; // nuovo
  setSelectedAllergens: (value: { label: string; value: string }[]) => void; // nuovo
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
