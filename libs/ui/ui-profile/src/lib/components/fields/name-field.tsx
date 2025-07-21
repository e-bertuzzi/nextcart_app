import { FormField, Input } from '@cloudscape-design/components';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';

type InputChangeEvent = NonCancelableCustomEvent<{ value: string }>;

type NameFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function NameField({ value, onChange, disabled }: NameFieldProps) {
  return (
    <FormField label="Name *">
      <Input
        value={value}
        onChange={(event: InputChangeEvent) => onChange(event.detail.value)}
        disabled={disabled}
      />
    </FormField>
  );
}
