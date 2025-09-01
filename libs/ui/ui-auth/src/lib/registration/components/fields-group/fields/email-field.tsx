import { FormField, Input } from '@cloudscape-design/components';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';

type InputChangeEvent = NonCancelableCustomEvent<{ value: string }>;

type EmailFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string; // aggiunto
};

export function EmailField({ value, onChange, disabled, error }: EmailFieldProps) {
  return (
    <FormField label="Email *" errorText={error}>
      <Input
        type="email"
        value={value}
        onChange={(event: InputChangeEvent) => onChange(event.detail.value)}
        disabled={disabled}
      />
    </FormField>
  );
}
