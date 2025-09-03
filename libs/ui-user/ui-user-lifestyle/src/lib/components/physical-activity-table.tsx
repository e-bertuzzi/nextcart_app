import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';

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
  if (activities.length === 0) {
    return <Typography>No activities added yet.</Typography>;
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        overflowX: 'auto',
        mt: 1,
        maxWidth: '100%',
      }}
    >
      <Table size="medium" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontWeight: 'bold', fontSize: 16, minWidth: 200 }}
            >
              Activity
            </TableCell>
            <TableCell
              sx={{ fontWeight: 'bold', fontSize: 16, minWidth: 140 }}
            >
              Duration (min)
            </TableCell>
            <TableCell
              sx={{ fontWeight: 'bold', fontSize: 16, minWidth: 180 }}
            >
              Date
            </TableCell>
            <TableCell
              sx={{ fontWeight: 'bold', fontSize: 16, minWidth: 150 }}
              align="right"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((item, index) => (
            <TableRow
              key={item.physicalActivityId}
              sx={{
                backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                '&:hover': { backgroundColor: '#f1f1f1' },
              }}
            >
              <TableCell>{item.specificActivity}</TableCell>
              <TableCell>{item.durationMinutes}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onRemove(item.physicalActivityId)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

