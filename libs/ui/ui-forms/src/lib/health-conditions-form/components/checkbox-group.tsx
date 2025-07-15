// src/components/form/CheckboxGroup.tsx
import React from 'react';
import { CheckboxInput } from './checkbox-input';

export type Option = {
  id: number;
  label: string;
};

type CheckboxGroupProps = {
  name: string;
  options: Option[];
  selected: number[];
  onChange: (id: number) => void;
  legend: string;
};

export function CheckboxGroup({ name, options, selected, onChange, legend }: CheckboxGroupProps) {
  return (
    <fieldset className="mb-6">
      <legend className="font-semibold mb-2">{legend}</legend>
      {options.map(opt => (
        <CheckboxInput
          key={opt.id}
          id={opt.id}
          name={name}
          label={opt.label}
          checked={selected.includes(opt.id)}
          onChange={() => onChange(opt.id)}
        />
      ))}
    </fieldset>
  );
}
