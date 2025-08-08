import { Multiselect } from '@cloudscape-design/components';

interface MultiSelectFieldProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
}

export function MultiSelectField({ label, options, selectedValues, onChange, disabled }: MultiSelectFieldProps) {
  const selectedOptions = options.filter((o) => selectedValues.includes(o.value));

  return (
    <Multiselect
      selectedOptions={selectedOptions}
      options={options}
      onChange={({ detail }) =>
        onChange(
          detail.selectedOptions
            .map((o) => o.value)
            .filter((v): v is string => typeof v === 'string')
        )
      }
      ariaLabel={label}
      disabled={disabled}
      placeholder={`Select ${label}`}
    />
  );
}
