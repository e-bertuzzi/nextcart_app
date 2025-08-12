import React, { useState, useEffect } from 'react';
import {
  Multiselect,
  Input,
  SpaceBetween,
  FormField,
  Table,
} from '@cloudscape-design/components';
import {
  NutritionalInfoOption,
  Option,
  ProductFormState,
} from '../interface/types';

interface ProductFieldsGroupProps {
  formData: ProductFormState;
  onChange: <K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K]
  ) => void;
  disabled?: boolean;
  categories: Option[];
  claims: Option[];
  allergens: Option[];
  dietOptions: Option[];
  nutritionalInfos: NutritionalInfoOption[];
  disableProductId?: boolean;
}

export function ProductFieldsGroup({
  formData,
  onChange,
  disabled,
  categories,
  claims,
  allergens,
  dietOptions,
  nutritionalInfos,
  disableProductId
}: ProductFieldsGroupProps) {
  const [selectedNutrients, setSelectedNutrients] = useState<
    NutritionalInfoOption[]
  >([]);

  // Reset se form vuoto dopo invio
  useEffect(() => {
    if (!formData.productId && !formData.name && !formData.itName) {
      setSelectedNutrients([]);
    }
  }, [formData]);

  // ✅ Pre-seleziona nutrienti già presenti nel prodotto con ordine stabile
  useEffect(() => {
    if (nutritionalInfos.length > 0 && formData.nutritionalInfoValues.length > 0) {
      const preselected = formData.nutritionalInfoValues
        .map((val) =>
          nutritionalInfos.find((ni) => ni.value === val.nutrientId)
        )
        .filter((ni): ni is NutritionalInfoOption => ni !== undefined);
      setSelectedNutrients(preselected);
    }
  }, [nutritionalInfos, formData.nutritionalInfoValues]);

  function handleNutritionalValueChange(nutrientId: string, newValue: string) {
    const currentValues = formData.nutritionalInfoValues || [];
    const index = currentValues.findIndex((v) => v.nutrientId === nutrientId);

    let updatedValues;

    if (index !== -1) {
      updatedValues = [...currentValues];
      updatedValues[index] = { nutrientId, value: newValue };
    } else {
      updatedValues = [...currentValues, { nutrientId, value: newValue }];
    }

    onChange('nutritionalInfoValues', updatedValues);
  }

  return (
    <SpaceBetween direction="vertical" size="m">
      {/* Product ID */}
      <Input
        disabled={disableProductId ?? false}
        value={formData.productId}
        onChange={({ detail }) => onChange('productId', detail.value)}
        placeholder="Product ID"
        ariaLabel="Product ID"
      />

      {/* Name */}
      <Input
        disabled={disabled}
        value={formData.name || ''}
        onChange={({ detail }) => onChange('name', detail.value)}
        placeholder="Name"
        ariaLabel="Name"
      />

      {/* Italian Name */}
      <Input
        disabled={disabled}
        value={formData.itName || ''}
        onChange={({ detail }) => onChange('itName', detail.value)}
        placeholder="Italian Name"
        ariaLabel="Italian Name"
      />

      {/* Category Single Select */}
      <Multiselect
        disabled={disabled}
        options={categories}
        selectedOptions={
          formData.productCategoryId
            ? categories.filter((o) => o.value === formData.productCategoryId)
            : []
        }
        onChange={({ detail }) => {
          const newValue =
            detail.selectedOptions.length > 0
              ? detail.selectedOptions[0].value
              : '';
          onChange('productCategoryId', newValue);
        }}
        ariaLabel="Product Category"
        placeholder="Select Category"
      />

      {/* Claims MultiSelect */}
      <Multiselect
        disabled={disabled}
        options={claims}
        selectedOptions={claims.filter((o) =>
          formData.productClaimIds.includes(o.value)
        )}
        onChange={({ detail }) =>
          onChange(
            'productClaimIds',
            detail.selectedOptions
              .map((o) => o.value)
              .filter((v): v is string => v !== undefined)
          )
        }
        ariaLabel="Product Claims"
        placeholder="Select Claims"
      />

      {/* Allergens MultiSelect */}
      <Multiselect
        disabled={disabled}
        options={allergens}
        selectedOptions={allergens.filter((o) =>
          formData.productAllergenIds.includes(o.value)
        )}
        onChange={({ detail }) =>
          onChange(
            'productAllergenIds',
            detail.selectedOptions
              .map((o) => o.value)
              .filter((v): v is string => v !== undefined)
          )
        }
        ariaLabel="Product Allergens"
        placeholder="Select Allergens"
      />

      {/* Diets MultiSelect */}
      {dietOptions.length > 0 && (
        <Multiselect
          disabled={disabled}
          options={dietOptions}
          selectedOptions={dietOptions.filter((o) =>
            formData.productDietIds.includes(o.value)
          )}
          onChange={({ detail }) =>
            onChange(
              'productDietIds',
              detail.selectedOptions
                .map((o) => o.value)
                .filter((v): v is string => v !== undefined)
            )
          }
          ariaLabel="Product Diets"
          placeholder="Select Diets"
        />
      )}

      {/* Nutritional Info Dynamic Selection */}
      <FormField label="Add Nutritional Values">
        <Multiselect
          disabled={disabled}
          options={nutritionalInfos}
          selectedOptions={selectedNutrients}
          onChange={({ detail }) => {
            // Mantiene l'ordine di selezione, non ricalcola
            setSelectedNutrients(detail.selectedOptions as NutritionalInfoOption[]);
          }}
          placeholder="Select nutrients to add"
        />
      </FormField>

      {selectedNutrients.length > 0 && (
        <FormField label="Nutritional Values">
          <Table
            columnDefinitions={[
              {
                id: 'nutrient',
                header: 'Nutrient',
                cell: (item) => item.label,
              },
              {
                id: 'value',
                header: 'Value',
                cell: (item) => {
                  const currentValue =
                    formData.nutritionalInfoValues?.find(
                      (v) => v.nutrientId === item.value
                    )?.value || '';

                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minHeight: '36px', // fissa l'altezza
                      }}
                    >
                      <Input
                        type="number"
                        value={currentValue}
                        onChange={({ detail }) =>
                          handleNutritionalValueChange(item.value, detail.value)
                        }
                        disabled={disabled}
                      />
                      <span style={{ whiteSpace: 'nowrap' }}>
                        {item.unitOfMeasure}
                      </span>
                    </div>
                  );
                },
              },
            ]}
            items={selectedNutrients}
            variant="embedded"
            stickyHeader
          />
        </FormField>
      )}
    </SpaceBetween>
  );
}
