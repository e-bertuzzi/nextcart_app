import { FormField, Input } from '@cloudscape-design/components';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';

type InputChangeEvent = NonCancelableCustomEvent<{ value: string }>;

type PlaceOfBirthFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string; // aggiunto
};

export function PlaceOfBirthField({ value, onChange, disabled, error }: PlaceOfBirthFieldProps) {
  return (
    <FormField label="Place of birth" errorText={error}>
      <Input
        value={value}
        onChange={(event: InputChangeEvent) => onChange(event.detail.value)}
        disabled={disabled}
      />
    </FormField>
  );
}
