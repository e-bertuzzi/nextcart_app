import { useState } from 'react';
import { useHealthConditions } from '@nextcart/ui-forms';
import { UserHealthConditionsTable } from '../components/user-health-condition-table';
import {
  Button,
  Container,
  Box,
  Alert,
  CircularProgress,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function UiHealthPage() {
  const { user, loading } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const { userHealthConditions, removeCondition, message, setMessage } =
    useHealthConditions(userId);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(
    null
  );

  if (loading) return <CircularProgress />;

  if (!user) return <Navigate to="/login" />;

  const handleRemoveClick = (id: string) => {
    setSelectedConditionId(id);
    setConfirmOpen(true);
  };

  const confirmRemove = () => {
    if (selectedConditionId) {
      removeCondition(selectedConditionId);
      setConfirmOpen(false);
      setSelectedConditionId(null);
    }
  };

  return (
    <Box mt={1} mx={2}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Intestazione centrata */}
          <Box mb={2} textAlign="center">
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 'bold', color: 'green', mb: 1 }}
            >
              Health Conditions Summary
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Review your current health conditions below.
            </Typography>
          </Box>

          {/* Messaggio sopra la tabella */}
          {message && (
            <Alert
              severity={message.type}
              variant='filled'
              onClose={() => setMessage(null)}
            >
              {message.content}
            </Alert>
          )}

          {/* Tabella */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              minHeight: 200,
              width: '100%',
              overflowX: 'auto',
            }}
          >
            {userHealthConditions.length === 0 ? (
              <Typography>No conditions selected.</Typography>
            ) : (
              <UserHealthConditionsTable
                conditions={userHealthConditions}
                onRemove={handleRemoveClick}
              />
            )}
          </Paper>

          {/* Pulsante centrato */}
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/dashboard/profile/health/edit')}
            >
              Change Conditions
            </Button>
          </Box>
        </Stack>
      </Container>

      {/* Modale di conferma */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this health condition?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={confirmRemove}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
