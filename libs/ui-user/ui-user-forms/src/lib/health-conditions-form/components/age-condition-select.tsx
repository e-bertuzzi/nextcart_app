import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface Props {
  selected: string | null; // MUI gestisce di solito valori come stringhe o numeri
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export function AgeConditionSelect({ selected, options, onChange }: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel id="age-select-label">Select Age Category</InputLabel>
      <Select
        labelId="age-select-label"
        value={selected || ''}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
