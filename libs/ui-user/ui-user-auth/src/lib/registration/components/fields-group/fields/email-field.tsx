import { TextField } from '@mui/material';

type EmailFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function EmailField({ value, onChange, disabled, error }: EmailFieldProps) {
  return (
    <TextField
      label="Email *"
      type="email"
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
