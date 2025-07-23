// UserBodyCompositionsTable.tsx
import { Button } from '@cloudscape-design/components';
import { SummaryTable } from '@nextcart/ui-commons';

interface BodyComposition {
  date: string;
  weight?: number;
  height?: number;
}

interface Props {
  compositions: BodyComposition[];
  onRemove: (date: string) => void;
  onEdit: (record: BodyComposition) => void;
}

export function UserBodyCompositionsTable({
  compositions,
  onRemove,
  onEdit,
}: Props) {
  return (
    <SummaryTable<BodyComposition>
      items={compositions}
      trackBy="date"
      header="Body Compositions"
      columnDefinitions={[
        {
          id: 'date',
          header: 'Date',
          cell: (item) => item.date,
        },
        {
          id: 'weight',
          header: 'Weight',
          cell: (item) => {
            const weightNum = Number(item.weight);
            return !isNaN(weightNum) ? weightNum.toFixed(2) : '-';
          },
        },
        {
          id: 'height',
          header: 'Height',
          cell: (item) => {
            const heightNum = Number(item.height);
            return !isNaN(heightNum) ? heightNum.toFixed(2) : '-';
          },
        },
        {
          id: 'actions',
          header: 'Actions',
          cell: (item) => (
            <>
              <Button onClick={() => onEdit(item)}>Edit</Button>{' '}
              <Button onClick={() => onRemove(item.date)}>Remove</Button>
            </>
          ),
        },
      ]}
    />
  );
}
