import { useState } from 'react';
import { useDiets } from '@nextcart/ui-forms';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  Alert,
  Paper,
  Stack,
  CircularProgress,
} from '@mui/material';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

interface Diet {
  label: string;
  value: string;
}

export function UiDietEdit() {
  const { user, loading } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const {
    selectedDiets,
    setSelectedDiets,
    availableDiets,
    saveSelectedDiets,
    message,
    setMessage,
  } = useDiets(userId);

  if (loading) return <CircularProgress />;
  if (!user) return <Navigate to="/login" />;

  const handleChange = (event: any) => {
    const values = event.target.value as string[];
    const selected = availableDiets.filter(
      (d) => d.value && values.includes(d.value) // ✅ controllo undefined
    ) as Diet[];
    setSelectedDiets(selected);
  };

  return (
    <Box m={2}>
      <Container maxWidth="sm">
        <Stack spacing={3}>
          {/* Intestazione */}
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: 'green' }}
            >
              Manage Diets
            </Typography>
          </Box>

          {/* Messaggio fuori dal campo */}
          {message && (
            <Alert
              severity={message.type}
              variant="filled"
              onClose={() => setMessage(null)}
              sx={{ width: '100%' }}
            >
              {message.content}
            </Alert>
          )}

          {/* Form multiselect */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="diet-select-label">Select Diets</InputLabel>
              <Select
                labelId="diet-select-label"
                multiple
                value={selectedDiets.map((d) => d.value)}
                onChange={handleChange}
                label="Select Diets" // ✅ per far "shrink" l'etichetta
                renderValue={(selected) =>
                  selected
                    .map(
                      (v) => availableDiets.find((d) => d.value === v)?.label
                    )
                    .join(', ')
                }
                MenuProps={{
                  PaperProps: {
                    style: { maxHeight: 300, width: 250 }, // larghezza fissa menu
                  },
                }}
                sx={{ minWidth: 250 }} // larghezza minima fissa della field
              >
                {availableDiets.map((diet) => (
                  <MenuItem key={diet.value} value={diet.value}>
                    <Checkbox
                      checked={selectedDiets.some(
                        (d) => d.value === diet.value
                      )}
                    />
                    <ListItemText primary={diet.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          {/* Pulsanti */}
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveSelectedDiets("/dashboard/profile")}
              disabled={selectedDiets.length === 0}
            >
              Save Diets
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                color: '#d32f2f', // colore testo più visibile (rosso scuro)
                borderColor: '#d32f2f', // colore bordo
                fontWeight: 'bold', // testo in grassetto
                '&:hover': {
                  backgroundColor: '#ffebee', // sfondo leggero al passaggio del mouse
                  borderColor: '#d32f2f',
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
