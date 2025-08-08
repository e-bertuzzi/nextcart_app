import React from 'react';
import { Multiselect, Input } from '@cloudscape-design/components';
import { Option, ProductFormState } from '../interface/types';

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
  nutritionalInfos: Option[];
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
}: ProductFieldsGroupProps) {
  return (
    <>
      <Input
        disabled={disabled}
        value={formData.productId}
        onChange={({ detail }) => onChange('productId', detail.value)}
        placeholder="Product ID"
        ariaLabel="Product ID"
      />

      <Input
        disabled={disabled}
        value={formData.name || ''}
        onChange={({ detail }) => onChange('name', detail.value)}
        placeholder="Name"
        ariaLabel="Name"
      />

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

      {/* Nutritional Info MultiSelect */}
      <Multiselect
        disabled={disabled}
        options={nutritionalInfos}
        selectedOptions={nutritionalInfos.filter((o) =>
          formData.nutritionalInfoIds.includes(o.value)
        )}
        onChange={({ detail }) =>
          onChange(
            'nutritionalInfoIds',
            detail.selectedOptions
              .map((o) => o.value)
              .filter((v): v is string => v !== undefined)
          )
        }
        ariaLabel="Nutritional Information"
        placeholder="Select Nutritional Info"
      />
    </>
  );
}
