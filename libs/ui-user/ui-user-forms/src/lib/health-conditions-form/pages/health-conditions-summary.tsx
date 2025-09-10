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

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        py: 4,
        px: 3,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {/* Intestazione centrata */}
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 'bold', color: 'green', mb: 1 }}
          >
            Health Conditions Summary
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Review your current health conditions below.
          </Typography>
        </Box>

        {/* Messaggio */}
        {message && (
          <Alert
            severity={message.type}
            variant="filled"
            onClose={() => setMessage(null)}
            sx={{ mb: 2 }}
          >
            {message.content}
          </Alert>
        )}

        {/* Tabella dentro Paper */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            minHeight: 200,
            width: '100%',
            overflowX: 'auto',
            mb: 3,
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

        {/* Pulsante centrato con spazio sotto */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard/profile/health/edit')}
            sx={{ maxWidth: 200, fontWeight: 'bold' }}
          >
            Change Conditions
          </Button>
        </Box>
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
