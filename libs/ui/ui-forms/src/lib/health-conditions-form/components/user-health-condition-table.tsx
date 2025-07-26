import { Button } from '@cloudscape-design/components';
import { SelectProps } from '@cloudscape-design/components';
import { SummaryTable } from '@nextcart/ui-commons';

interface Props {
  conditions: SelectProps.Option[];
  onRemove: (id: string) => void;
}

export function UserHealthConditionsTable({ conditions, onRemove }: Props) {
  return (
    <SummaryTable<SelectProps.Option>
      items={conditions}
      trackBy="value"
      header="Current Conditions"
      columnDefinitions={[
        {
          id: 'description',
          header: 'Description',
          cell: (item) => item.label,
        },
        {
          id: 'actions',
          header: 'Actions',
          cell: (item) => (
            <Button
              variant="inline-link"
              onClick={() => onRemove(String(item.value))}
            >
              Remove
            </Button>
          ),
        },
      ]}
      variant="embedded"
      stickyHeader
    />
  );
}
