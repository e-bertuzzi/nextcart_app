import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Alert,
  CircularProgress,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useBodyCompositions } from '@nextcart/ui-forms';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

interface BodyCompositionFormData {
  date: string;
  weight?: string;
  height?: string;
}

export function UiBodyEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const editRecord = location.state?.record;
  const { user, loading } = useUser();

  const userId = user?.id;
  const { saveComposition, message, setMessage } = useBodyCompositions(userId);

  const [formData, setFormData] = useState<BodyCompositionFormData>({
    date: editRecord?.date || '',
    weight: editRecord?.weight?.toString() || '',
    height: editRecord?.height?.toString() || '',
  });

  const [errors, setErrors] = useState<{
    [key in keyof BodyCompositionFormData]?: string;
  }>({});

  const handleChange = (key: keyof BodyCompositionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const newErrors: { date?: string } = {};
    if (!formData.date) newErrors.date = 'Date is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      setMessage?.({
        type: 'error',
        content: 'Please fix the errors before submitting.',
      });
      return;
    }

    const dto = {
      date: formData.date,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      height: formData.height ? parseFloat(formData.height) : undefined,
    };

    saveComposition(dto);
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!user) return <Navigate to="/login" />;

  return (
    <Box m={2}>
      <Container maxWidth="sm">
        <Stack spacing={3}>
          {/* Intestazione */}
          <Typography variant="h4" fontWeight="bold" color="green" gutterBottom>
            {editRecord ? 'Edit Body Composition' : 'Add Body Composition'}
          </Typography>

          {/* Messaggio */}
          {message && (
            <Alert
              severity={message.type === 'error' ? 'error' : 'success'}
              variant='filled'
              onClose={() => setMessage?.(null)}
              sx={{ width: '100%' }}
            >
              {message.content}
            </Alert>
          )}

          {/* Form container con Paper */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Stack spacing={3}>
              {/* Date */}
              <DatePicker
                label="Date"
                value={formData.date ? dayjs(formData.date) : null}
                onChange={(newValue: Dayjs | null) =>
                  handleChange(
                    'date',
                    newValue ? newValue.format('YYYY-MM-DD') : ''
                  )
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(errors.date),
                    helperText: errors.date,
                    disabled: Boolean(editRecord),
                  },
                }}
              />

              {/* Weight */}
              <TextField
                label="Weight (kg)"
                type="number"
                inputProps={{ step: 'any' }}
                value={formData.weight ?? ''}
                onChange={(e) => handleChange('weight', e.target.value)}
                fullWidth
              />

              {/* Height */}
              <TextField
                label="Height (cm)"
                type="number"
                inputProps={{ step: 'any' }}
                value={formData.height ?? ''}
                onChange={(e) => handleChange('height', e.target.value)}
                fullWidth
              />

              {/* Pulsanti */}
              <Box display="flex" gap={2}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Save Body Composition
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
