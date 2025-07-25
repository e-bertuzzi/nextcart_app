import { FormField, Input } from '@cloudscape-design/components';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';

type InputChangeEvent = NonCancelableCustomEvent<{ value: string }>;

type AddressFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function AddressField({ value, onChange, disabled }: AddressFieldProps) {
  return (
    <FormField label="Address">
      <Input
        value={value}
        onChange={(event: InputChangeEvent) => onChange(event.detail.value)}
        disabled={disabled}
      />
    </FormField>
  );
}
