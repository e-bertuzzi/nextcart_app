import { Button, Modal, SpaceBetween } from '@cloudscape-design/components';
import { useState } from 'react';
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleRemoveClick = (date: string) => {
    setSelectedDate(date);
    setConfirmOpen(true);
  };

  const confirmRemove = () => {
    if (selectedDate) {
      onRemove(selectedDate);
      setConfirmOpen(false);
      setSelectedDate(null);
    }
  };

  return (
    <>
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
                <Button
                  variant="normal"
                  onClick={() => handleRemoveClick(item.date)}
                >
                  Remove
                </Button>
              </>
            ),
          },
        ]}
      />

      <Modal
        visible={confirmOpen}
        header="Confirm deletion"
        onDismiss={() => setConfirmOpen(false)}
        closeAriaLabel="Close modal"
        footer={
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={confirmRemove}>
              Confirm
            </Button>
          </SpaceBetween>
        }
      >
        Are you sure you want to remove this record?
      </Modal>
    </>
  );
}
