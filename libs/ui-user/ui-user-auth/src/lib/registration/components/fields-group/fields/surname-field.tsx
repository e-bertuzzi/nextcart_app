import { TextField } from '@mui/material';

type SurnameFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function SurnameField({
  value,
  onChange,
  disabled,
  error,
}: SurnameFieldProps) {
  return (
    <TextField
      label="Surname *"
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
