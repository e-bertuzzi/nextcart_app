import { TextField } from '@mui/material';

type AddressFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function AddressField({ value, onChange, disabled, error }: AddressFieldProps) {
  return (
    <TextField
      label="Address"
      type="address"
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
