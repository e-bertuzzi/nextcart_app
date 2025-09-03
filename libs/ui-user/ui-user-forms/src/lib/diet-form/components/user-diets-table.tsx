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

export interface Diet {
  label: string;
  value: string;
}

interface Props {
  diets: Diet[];
  onRemove: (dietId: string) => void;
}

export function UserDietsTable({ diets, onRemove }: Props) {
  if (diets.length === 0) {
    return <Typography>No diets selected.</Typography>;
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
            <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Diet</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diets.map((diet, index) => (
            <TableRow
              key={diet.value}
              sx={{
                backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                '&:hover': { backgroundColor: '#f1f1f1' }, // evidenzia solo hover
              }}
            >
              <TableCell>{diet.label}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onRemove(diet.value)}
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
