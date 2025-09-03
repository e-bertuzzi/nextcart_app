import { TextField } from '@mui/material';

type PlaceOfBirthFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function PlaceOfBirthField({
  value,
  onChange,
  disabled,
  error,
}: PlaceOfBirthFieldProps) {
  return (
    <TextField
      label="Place of birth"
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
