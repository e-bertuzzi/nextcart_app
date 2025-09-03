import { TextField } from '@mui/material';

type PasswordFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
};

export function PasswordField({
  value,
  onChange,
  label = 'Password *',
  disabled,
  error,
}: PasswordFieldProps) {
  return (
    <TextField
      type="password"
      label={label}
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
