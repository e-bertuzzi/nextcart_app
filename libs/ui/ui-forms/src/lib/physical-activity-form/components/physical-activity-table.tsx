import { Button } from '@cloudscape-design/components';
import { SummaryTable } from '@nextcart/ui-commons';

interface PhysicalActivity {
  physicalActivityId: number;
  specificActivity: string;
  durationMinutes: number;
  date: string;
}

interface Props {
  activities: PhysicalActivity[];
  onRemove: (id: number) => void;
}

export function UserPhysicalActivitiesTable({ activities, onRemove }: Props) {
  return (
    <SummaryTable<PhysicalActivity>
      items={activities}
      trackBy="physicalActivityId"
      header="Physical Activities"
      columnDefinitions={[
        {
          id: 'activity',
          header: 'Activity',
          cell: (item) => item.specificActivity,
        },
        {
          id: 'duration',
          header: 'Duration (min)',
          cell: (item) => item.durationMinutes,
        },
        {
          id: 'date',
          header: 'Date',
          cell: (item) => item.date,
        },
        {
          id: 'actions',
          header: 'Actions',
          cell: (item) => (
            <Button
              variant="inline-link"
              onClick={() => onRemove(item.physicalActivityId)}
            >
              Remove
            </Button>
          ),
        },
      ]}
      variant="embedded"
      stickyHeader
      empty={<div>No activities added yet.</div>}
    />
  );
}
