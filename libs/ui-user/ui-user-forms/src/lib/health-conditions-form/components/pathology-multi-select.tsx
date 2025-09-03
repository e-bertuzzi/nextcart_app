import { Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel } from '@mui/material';

interface Option {
  label: string;
  value: string;
}

interface Props {
  selected: Option[];
  options: Option[];
  onChange: (selected: Option[]) => void;
}

export function PathologyMultiselect({ selected, options, onChange }: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel id="pathology-multiselect-label">Select Pathologies (compatible with Age)</InputLabel>
      <Select
        labelId="pathology-multiselect-label"
        multiple
        value={selected.map((s) => s.value)}
        onChange={(event) => {
          const values = event.target.value as string[];
          const selectedOptions = options.filter((opt) => values.includes(opt.value));
          onChange(selectedOptions);
        }}
        renderValue={(selectedValues) =>
          (selectedValues as string[])
            .map((value) => options.find((opt) => opt.value === value)?.label)
            .join(', ')
        }
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={selected.some((s) => s.value === option.value)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
