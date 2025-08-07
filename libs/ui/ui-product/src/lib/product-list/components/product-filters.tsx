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
  onReset,
}: {
  categories: { label: string; value: string }[];
  selectedCategories: any[];
  setSelectedCategories: (value: any[]) => void;
  diets: { label: string; value: string }[];
  selectedDiets: { label: string; value: string }[];
  setSelectedDiets: (value: { label: string; value: string }[]) => void;
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

      <FormField label="Filtra by diet">
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

      <Button onClick={onReset}>
        Reset filters
      </Button>
      <hr style={{ marginTop: '1rem', marginBottom: '1rem', border: 'none', borderTop: '1px solid #ccc' }} />
    </SpaceBetween>
  );
}