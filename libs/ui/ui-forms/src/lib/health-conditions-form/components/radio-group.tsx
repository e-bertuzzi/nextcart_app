// src/components/form/RadioGroup.tsx
import React from 'react';
import { RadioInput } from './radio-input';

export type Option = {
  id: number;
  label: string;
};

type RadioGroupProps = {
  name: string;
  options: Option[];
  selected: number | null;
  onChange: (id: number) => void;
  legend: string;
};

export function RadioGroup({ name, options, selected, onChange, legend }: RadioGroupProps) {
  return (
    <fieldset className="mb-6">
      <legend className="font-semibold mb-2">{legend}</legend>
      {options.map(opt => (
        <RadioInput
          key={opt.id}
          id={opt.id}
          name={name}
          label={opt.label}
          checked={selected === opt.id}
          onChange={() => onChange(opt.id)}
        />
      ))}
    </fieldset>
  );
}
