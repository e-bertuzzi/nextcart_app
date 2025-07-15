// src/components/form/RadioInput.tsx
import React from 'react';

type RadioInputProps = {
  id: number;
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

export function RadioInput({ id, name, label, checked, onChange }: RadioInputProps) {
  return (
    <label className="block mb-1 cursor-pointer" htmlFor={`${name}-${id}`}>
      <input
        type="radio"
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
