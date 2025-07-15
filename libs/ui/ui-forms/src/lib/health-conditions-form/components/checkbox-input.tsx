// src/components/form/CheckboxInput.tsx
import React from 'react';

type CheckboxInputProps = {
  id: number;
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

export function CheckboxInput({ id, name, label, checked, onChange }: CheckboxInputProps) {
  return (
    <label className="block mb-1 cursor-pointer" htmlFor={`${name}-${id}`}>
      <input
        type="checkbox"
        id={`${name}-${id}`}
        name={name}
        value={id}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      {label}
    </label>
  );
}
