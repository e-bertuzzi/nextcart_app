import { TextField } from '@mui/material';

type NameFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function NameField({ value, onChange, disabled, error }: NameFieldProps) {
  return (
    <TextField
      label="Name *"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      error={!!error}
      helperText={error}
      fullWidth
      margin="normal"
    />
  );
}
