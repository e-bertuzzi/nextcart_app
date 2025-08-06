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
          placeholder="Seleziona diete"
          selectedAriaLabel="Diete selezionate"
          empty="Nessuna dieta disponibile"
          ariaLabel="Dieta"
        />
      </FormField>

      <Button onClick={onReset} variant="link">
        Reset filtri
      </Button>
    </SpaceBetween>
  );
}
