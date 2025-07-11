import { FormField, Select, SelectProps } from '@cloudscape-design/components';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';

const genderOptions = [
  { value: 'Male', label: 'Maschio' },
  { value: 'Female', label: 'Femmina' },
  { value: 'Other', label: 'Altro' },
];

type GenderFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function GenderField({ value, onChange, disabled }: GenderFieldProps) {
  const handleChange = (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => {
    const selectedValue = event.detail.selectedOption?.value ?? '';
    onChange(selectedValue);

  };

  return (
    <FormField label="Genere *">
      <Select
        selectedOption={genderOptions.find(opt => opt.value === value) ?? null}
        options={genderOptions}
        onChange={handleChange}
        disabled={disabled}
      />
    </FormField>
  );
}
