import { FormField, Input } from '@cloudscape-design/components';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';

type InputChangeEvent = NonCancelableCustomEvent<{ value: string }>;

type SurnameFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string; // aggiunto
};

export function SurnameField({ value, onChange, disabled, error }: SurnameFieldProps) {
  return (
    <FormField label="Surname *" errorText={error}>
      <Input
        value={value}
        onChange={(event: InputChangeEvent) => onChange(event.detail.value)}
        disabled={disabled}
      />
    </FormField>
  );
}
