import { Table, Button, Box } from '@cloudscape-design/components';

interface BodyComposition {
  date: string;
  weight?: number;
  height?: number;
}

interface Props {
  compositions: BodyComposition[];
  onRemove: (date: string) => void;
}

export function UserBodyCompositionsTable({ compositions, onRemove }: Props) {
  return (
    <Box>
      <Table
        items={compositions}
        trackBy="date"
        variant="embedded"
        stickyHeader
        header="Body Composition History"
        columnDefinitions={[
          {
            id: 'date',
            header: 'Date',
            cell: (item) => new Date(item.date).toLocaleDateString(),
          },
          {
            header: 'Weight (kg)',
            cell: (item) => {
              const w = Number(item.weight);
              return isNaN(w) ? '-' : w.toFixed(2);
            },
          },
          {
            header: 'Height (cm)',
            cell: (item) => {
              const h = Number(item.height);
              return isNaN(h) ? '-' : h.toFixed(2);
            },
          },
          {
            id: 'actions',
            header: 'Actions',
            cell: (item) => (
              <Button variant="inline-link" onClick={() => onRemove(item.date)}>
                Remove
              </Button>
            ),
            width: 120,
          },
        ]}
        resizableColumns
        wrapLines
        stripedRows
        empty={
          <Box textAlign="center" padding="s">
            No body composition records available.
          </Box>
        }
      />
    </Box>
  );
}
