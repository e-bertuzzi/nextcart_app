import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
} from '@mui/material';
import { SelectProps } from '@cloudscape-design/components';

interface Props {
  conditions: SelectProps.Option[];
  onRemove: (id: string) => void;
}

export function UserHealthConditionsTable({ conditions, onRemove }: Props) {
  if (conditions.length === 0) {
    return <Typography>No current conditions.</Typography>;
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        overflowX: 'auto',
        mt: 1,           // sposta leggermente verso l'alto
        maxWidth: '100%', // allarga la tabella
      }}
    >
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>
              Description
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conditions.map((condition, index) => (
            <TableRow
              key={condition.value}
              sx={{
                backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                '&:hover': { backgroundColor: '#f1f1f1' }, // evidenzia solo hover
              }}
            >
              <TableCell>{condition.label}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onRemove(String(condition.value))}
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
