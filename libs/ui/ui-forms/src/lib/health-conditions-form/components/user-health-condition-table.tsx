import { Table, Button } from '@cloudscape-design/components';
import { SelectProps } from '@cloudscape-design/components';

interface Props {
  conditions: SelectProps.Option[];
  onRemove: (id: number) => void;
}

export function UserHealthConditionsTable({ conditions, onRemove }: Props) {
  return (
    <Table
      items={conditions}
      columnDefinitions={[
        {
          header: 'Description',
          cell: (item) => item.label,
        },
        {
          header: 'Actions',
          cell: (item) => (
            <Button variant="inline-link" onClick={() => onRemove(Number(item.value))}>
              Remove
            </Button>
          ),
        },
      ]}
      trackBy="value"
      variant="embedded"
      header="Current Conditions"
      stickyHeader
    />
  );
}
