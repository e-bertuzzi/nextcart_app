import {
  Container,
  Paper,
  Stack,
  Typography,
  Alert,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { usePhysicalActivity } from '@nextcart/ui-forms';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export function UiPhysicalActivityEdit() {
  const { user, loading } = useUser();
  const userId = user?.id;
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const {
    allActivities,
    selectedActivity,
    setSelectedActivity,
    specificActivity,
    setSpecificActivity,
    durationMinutes,
    setDurationMinutes,
    date,
    setDate,
    saveActivity,
    message,
    setMessage,
  } = usePhysicalActivity(userId);

  if (loading) return <Typography>Loading...</Typography>;
  if (!user) return <Navigate to="/login" />;

  const specificOptions = allActivities
    .filter((a) => a.type === selectedActivity?.value)
    .map((a) => ({
      value: a.id.toString(),
      label: a.name,
    }));

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 3, textAlign: 'center', color: 'green' }}
        >
          Add Physical Activity
        </Typography>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>

        <Stack spacing={3}>
          {/* Messaggi */}
          {message && (
            <Alert
              severity={message.type}
              variant='filled'
              onClose={() => setMessage(null)}
            >
              {message.content}
            </Alert>
          )}

          {/* Step 1 - Tipo di attività */}
          <TextField
            select
            label="Select activity type"
            value={selectedActivity?.value || ''}
            onChange={(e) => {
              const option = {
                value: e.target.value,
                label: e.target.value,
              };
              setSelectedActivity(option);
              setSpecificActivity(null);
              setStep(2);
            }}
            fullWidth
          >
            {Array.from(new Set(allActivities.map((a) => a.type))).map(
              (type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              )
            )}
          </TextField>

          {/* Step 2 - Attività specifica */}
          {step >= 2 && (
            <TextField
              select
              label="Select specific activity"
              value={specificActivity?.value || ''}
              onChange={(e) => {
                const option = specificOptions.find(
                  (o) => o.value === e.target.value
                ) || null;
                setSpecificActivity(option);
                setStep(3);
              }}
              fullWidth
            >
              {specificOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          {/* Step 3 - Data e durata */}
          {step >= 3 && (
            <>
              <DatePicker
                label="Select date"
                value={date ? dayjs(date) : null}
                onChange={(newDate) =>
                  setDate(newDate ? newDate.format('YYYY-MM-DD') : '')
                }
                slotProps={{ textField: { fullWidth: true } }}
              />

              <TextField
                label="Duration (minutes)"
                type="number"
                value={durationMinutes.toString()}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                fullWidth
              />
            </>
          )}

          {/* Pulsanti */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {step >= 3 && (
              <Button variant="contained" color="primary" onClick={saveActivity}>
                Save Activity
              </Button>
            )}
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
