import { TextField } from '@mui/material';
import React from 'react';

type DateOfBirthFieldProps = {
  value: string; // formato 'YYYY-MM-DD'
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function DateOfBirthField({ value, onChange, disabled, error }: DateOfBirthFieldProps) {
  return (
    <TextField
      label="Date of birth *"
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      error={!!error}
      helperText={error}
      variant="outlined"
      size="small"
      fullWidth
      InputLabelProps={{
        shrink: true, // mantiene l'etichetta sopra il campo
      }}
    />
  );
}
