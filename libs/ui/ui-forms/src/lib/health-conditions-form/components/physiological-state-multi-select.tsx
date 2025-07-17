import { Multiselect, SelectProps } from '@cloudscape-design/components';

interface Props {
  selected: SelectProps.Option[];
  options: SelectProps.Option[];
  onChange: (selected: SelectProps.Option[]) => void;
}

export function PhysiologicalStateMultiselect({ selected, options, onChange }: Props) {
  return (
    <Multiselect
      selectedOptions={selected}
      onChange={({ detail }) => onChange([...detail.selectedOptions])} 
      options={options}
      placeholder="Select Physiological States (compatible)"
    />
  );
}
