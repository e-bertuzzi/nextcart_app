import { FormField, Select, SelectProps } from '@cloudscape-design/components';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
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
    <FormField label="Gender *">
      <Select
        selectedOption={genderOptions.find(opt => opt.value === value) ?? null}
        options={genderOptions}
        onChange={handleChange}
        disabled={disabled}
      />
    </FormField>
  );
}
