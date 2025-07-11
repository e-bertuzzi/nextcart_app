import { FormField, Input } from '@cloudscape-design/components';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';

type InputChangeEvent = NonCancelableCustomEvent<{ value: string }>;

type PasswordFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
};

export function PasswordField({ value, onChange, label = 'Password *', disabled }: PasswordFieldProps) {
  return (
    <FormField label={label}>
      <Input
        type="password"
        value={value}
        onChange={(event: InputChangeEvent) => onChange(event.detail.value)}
        disabled={disabled}
      />
    </FormField>
  );
}
