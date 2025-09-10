import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

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
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, boxShadow: 2, mt: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Weight</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Height</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compositions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">
                    No records available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              compositions.map((item, index) => (
                <TableRow
                  key={item.date}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    {item.weight !== undefined && !isNaN(Number(item.weight))
                      ? Number(item.weight).toFixed(2)
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {item.height !== undefined && !isNaN(Number(item.height))
                      ? Number(item.height).toFixed(2)
                      : '-'}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onEdit(item)}
                      sx={{
                        mr: 1,
                        fontWeight: 'bold',
                        color: '#2e7d32', // verde scuro per il testo
                        borderColor: '#2e7d32', // verde scuro per il bordo
                        '&:hover': {
                          backgroundColor: 'rgba(46, 125, 50, 0.08)', // sfondo leggero verde al passaggio del mouse
                          borderColor: '#1b5e20', // bordo leggermente più scuro al hover
                        },
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveClick(item.date)}
                      sx={{ fontWeight: 'bold' }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog di conferma */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this record?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={confirmRemove}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
