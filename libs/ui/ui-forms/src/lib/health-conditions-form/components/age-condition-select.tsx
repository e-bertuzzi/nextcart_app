import { Select, SelectProps } from '@cloudscape-design/components';

interface Props {
  selected: SelectProps.Option | null;
  options: SelectProps.Option[];
  onChange: (option: SelectProps.Option) => void;
}

export function AgeConditionSelect({ selected, options, onChange }: Props) {
  return (
    <Select
      selectedOption={selected}
      onChange={({ detail }) => onChange(detail.selectedOption)}
      options={options}
      placeholder="Select Age Category"
    />
  );
}
