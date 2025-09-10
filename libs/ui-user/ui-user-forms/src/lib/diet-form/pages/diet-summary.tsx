import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useDiets } from '@nextcart/ui-forms';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserDietsTable } from '../components/user-diets-table';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function UiDietPage() {
  const { user, loading } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const { selectedDiets, removeDiet, message, setMessage } = useDiets(userId);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDietId, setSelectedDietId] = useState<string | null>(null);

  const normalizedDiets = selectedDiets.map((d) => ({
    label: d.label ?? '',
    value: d.value ?? '',
  }));

  if (loading) return <Typography>Loading...</Typography>;
  if (!user) return <Navigate to="/login" />;

  const handleRemoveClick = (dietId: string) => {
    setSelectedDietId(dietId);
    setConfirmOpen(true);
  };

  const confirmRemove = () => {
    if (selectedDietId) {
      removeDiet(selectedDietId);
      setConfirmOpen(false);
      setSelectedDietId(null);
    }
  };

  return (
    <Container maxWidth="md">
      <Stack spacing={3} mt={2} alignItems="center">
        {/* Intestazione */}
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" color="green">
            Diets Summary
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Review your selected diets below.
          </Typography>
        </Box>

        {/* Messaggio sopra la tabella */}
        {message && (
          <Box sx={{ width: '100%', maxWidth: 600 }}>
            <Alert
              severity={message.type}
              onClose={() => setMessage(null)}
              variant="filled"
            >
              {message.content}
            </Alert>
          </Box>
        )}

        {/* Tabella */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            width: '100%',
            maxWidth: 600,
            overflowX: 'auto',
          }}
        >
          {normalizedDiets.length === 0 ? (
            <Typography>No diets selected.</Typography>
          ) : (
            <UserDietsTable
              diets={normalizedDiets}
              onRemove={handleRemoveClick}
            />
          )}
        </Paper>

        {/* Pulsante centrato con piccolo margine */}
        <Box display="flex" justifyContent="center" mt={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard/profile/diet/edit')}
            sx={{ fontWeight: 'bold' }} // testo in grassetto
          >
            Change Diets
          </Button>
        </Box>
      </Stack>

      {/* Modale di conferma */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this diet?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={confirmRemove}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
