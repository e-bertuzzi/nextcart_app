import { useState } from 'react';
import { usePhysicalActivity } from '@nextcart/ui-forms';
import { UserPhysicalActivitiesTable } from '../../components/physical-activity-table';
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Paper,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function UiPhysicalActivityPage() {
  const { user, loading } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const {
    userActivities,
    removeActivity,
    message,
    setMessage,
    loadingActivities,
  } = usePhysicalActivity(userId);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    null
  );

  if (loading || loadingActivities) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleRemoveClick = (activityId: number) => {
    setSelectedActivityId(activityId);
    setConfirmOpen(true);
  };

  const confirmRemove = () => {
    if (selectedActivityId) {
      removeActivity(selectedActivityId);
      setConfirmOpen(false);
      setSelectedActivityId(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      {/* Intestazione centrata */}
      <Box textAlign="center" mb={3}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: 'green' }}
          gutterBottom
        >
          Physical Activity Summary
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review your logged activities and add new ones to keep track of your
          progress.
        </Typography>
      </Box>

      <FormLayout message={message} setMessage={setMessage}>
        {/* Tabella */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            width: '100%',
            minHeight: 200,
            overflowX: 'auto',
          }}
        >
          {userActivities.length === 0 ? (
            <Typography color="text.secondary" align="center">
              No physical activities logged.
            </Typography>
          ) : (
            <UserPhysicalActivitiesTable
              activities={userActivities}
              onRemove={handleRemoveClick}
            />
          )}
        </Paper>

        {/* Pulsante separato dalla tabella */}
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard/lifestyle/activity/edit')}
            sx={{ maxWidth: 220 }}
          >
            Add new activity
          </Button>
        </Box>
      </FormLayout>

      {/* Modale di conferma */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this activity?
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

function FormLayout({ children, message, setMessage }: any) {
  return (
    <Stack spacing={3}>
      {message && (
        <Alert
          severity={message.type === 'error' ? 'error' : 'success'}
          variant="filled"
          onClose={() => setMessage(null)}
        >
          {message.content}
        </Alert>
      )}
      {children}
    </Stack>
  );
}
