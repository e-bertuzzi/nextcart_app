import { Button } from '@cloudscape-design/components';
import { SummaryTable } from '@nextcart/ui-commons';

export interface Diet {
  label: string;
  value: string;
}

export interface UserDietsTableProps {
  diets: Diet[];
  onRemove: (dietId: string) => void;
}

export function UserDietsTable({ diets, onRemove }: UserDietsTableProps) {
  return (
    <SummaryTable<Diet>
      items={diets}
      trackBy="value"
      header="Selected Diets"
      columnDefinitions={[
        {
          id: 'label',
          header: 'Diet',
          cell: (item) => item.label,
          sortingField: 'label',
        },
        {
          id: 'actions',
          header: 'Actions',
          cell: (item) => (
            <Button
              variant="inline-link"
              onClick={() => onRemove(item.value)}
            >
              Remove
            </Button>
          ),
        },
      ]}
      stickyHeader
      empty={<p>No diets selected.</p>}
    />
  );
}
