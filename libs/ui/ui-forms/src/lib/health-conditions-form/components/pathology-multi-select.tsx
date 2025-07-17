import { Multiselect, SelectProps } from '@cloudscape-design/components';

interface Props {
  selected: SelectProps.Option[];
  options: SelectProps.Option[];
  onChange: (selected: SelectProps.Option[]) => void;
}

export function PathologyMultiselect({ selected, options, onChange }: Props) {
  return (
    <Multiselect
      selectedOptions={selected}
      onChange={({ detail }) => onChange([...detail.selectedOptions])} 
      options={options}
      placeholder="Select Pathologies (compatible with Age)"
    />
  );
}
