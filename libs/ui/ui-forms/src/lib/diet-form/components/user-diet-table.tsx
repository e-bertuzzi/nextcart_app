import { Table, Button } from '@cloudscape-design/components';

interface UserDietsTableProps {
  diets: { label: string; value: number }[];
  onRemove: (dietId: number) => void;
}

export function UserDietsTable({ diets, onRemove }: UserDietsTableProps) {
  return (
    <Table
      items={diets}
      columnDefinitions={[
        {
          header: 'Diet',
          cell: (item) => item.label,
          sortingField: 'label',
          id: 'label',
        },
        {
          header: 'Actions',
          cell: (item) => (
            <Button variant="inline-link" onClick={() => onRemove(item.value)}>
              Remove
            </Button>
          ),
          id: 'actions',
        },
      ]}
      trackBy="value"
      variant="embedded"
      stickyHeader
      header="Selected Diets"
      empty={<p>No diets selected.</p>}
    />
  );
}
