import { FormField, DatePicker } from '@cloudscape-design/components';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';

type DateChangeEvent = NonCancelableCustomEvent<{ value?: string }>;

type DateOfBirthFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function DateOfBirthField({ value, onChange, disabled }: DateOfBirthFieldProps) {
  return (
    <FormField label="Date of birth *">
      <DatePicker
        value={value}
        onChange={(event: DateChangeEvent) => onChange(event.detail.value ?? '')}
        disabled={disabled}
      />
    </FormField>
  );
}

