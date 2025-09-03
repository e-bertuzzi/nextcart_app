import { TextField, MenuItem } from '@mui/material';

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

type GenderFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function GenderField({ value, onChange, disabled, error }: GenderFieldProps) {
  return (
    <TextField
      select
      label="Gender *"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      error={!!error}
      helperText={error}
      fullWidth
      margin="normal"
    >
      {genderOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
