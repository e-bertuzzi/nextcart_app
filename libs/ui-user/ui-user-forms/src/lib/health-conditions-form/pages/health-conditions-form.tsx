import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Stack,
  FormHelperText,
  Typography,
} from '@mui/material';
import { useHealthConditions } from '@nextcart/ui-forms';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

interface Option {
  label: string;
  value: string;
}

export function UiHealthEdit() {
  const { user, loading } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const {
    selectedAgeCondition,
    setSelectedAgeCondition,
    selectedPathologies,
    setSelectedPathologies,
    selectedPhysStates,
    setSelectedPhysStates,
    ageConditions,
    pathologies,
    physStates,
    saveSelectedConditions,
    message,
    setMessage,
  } = useHealthConditions(userId);

  if (loading) return <CircularProgress />;

  if (!user) return <Navigate to="/login" />;

  // Step dinamici
  const showStep2 = !!selectedAgeCondition && pathologies.length > 0;
  const showStep3 =
    showStep2 && selectedPathologies.length > 0 && physStates.length > 0;

  const canSave =
    !!selectedAgeCondition &&
    (pathologies.length === 0 || selectedPathologies.length > 0) &&
    (physStates.length === 0 || selectedPhysStates.length > 0);

  const safePathologies: Option[] = pathologies.map((p) => ({
    value: String(p.value),
    label: p.label || 'Unknown',
  }));
  const safeSelectedPathologies: Option[] = selectedPathologies.map((p) => ({
    value: String(p.value),
    label: p.label || 'Unknown',
  }));
  const safePhysStates: Option[] = physStates.map((p) => ({
    value: String(p.value),
    label: p.label || 'Unknown',
  }));
  const safeSelectedPhysStates: Option[] = selectedPhysStates.map((p) => ({
    value: String(p.value),
    label: p.label || 'Unknown',
  }));

  const handleMultiSelectChange = (
    options: Option[],
    selected: Option[],
    setSelected: (opts: Option[]) => void,
    event: any
  ) => {
    const values = event.target.value as string[];
    const selectedOptions = options.filter((opt) => values.includes(opt.value));
    const hasNone = selectedOptions.some((o) => o.value === '0');

    if (hasNone) {
      setSelected([selectedOptions.find((o) => o.value === '0')!]);
    } else {
      setSelected(selectedOptions.filter((o) => o.value !== '0'));
    }
  };

  return (
    <Box m={2}>
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: 'green' }}
            >
              Manage health conditions
            </Typography>
            <h2>
              Warning: All previously selected conditions will be overwritten.
            </h2>
          </Box>

          {/* Messaggio sopra il form */}
          <Box minHeight={60}>
            {message && (
              <Alert
                severity={message.type === 'error' ? 'error' : 'success'}
                variant='filled'
                onClose={() => setMessage(null)}
              >
                {message.content}
              </Alert>
            )}
          </Box>

          {/* Step 1: Age Category */}
          <Paper variant="outlined" sx={{ p: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="age-select-label">Select Age Category</InputLabel>
              <Select
                labelId="age-select-label"
                value={selectedAgeCondition?.value || ''}
                label="Select Age Category"
                onChange={(event) => {
                  const selected = ageConditions.find(
                    (opt) => opt.value === event.target.value
                  );
                  setSelectedAgeCondition(selected || null);
                  setSelectedPathologies([]);
                  setSelectedPhysStates([]);
                }}
              >
                {ageConditions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label || 'Unknown'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          {/* Step 2: Pathologies */}
          {showStep2 && (
            <Paper variant="outlined" sx={{ p: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="pathology-multiselect-label">
                  Select Pathologies (compatible with Age)
                </InputLabel>
                <Select
                  labelId="pathology-multiselect-label"
                  multiple
                  value={selectedPathologies.map((s) => s.value)}
                  label="Select Pathologies (compatible with Age)"
                  onChange={(e) =>
                    handleMultiSelectChange(
                      [
                        { value: '0', label: 'No pathology' },
                        ...safePathologies,
                      ],
                      safeSelectedPathologies,
                      setSelectedPathologies,
                      e
                    )
                  }
                  renderValue={(selected) =>
                    selected
                      .map(
                        (value) =>
                          [
                            { value: '0', label: 'No pathology' },
                            ...safePathologies,
                          ].find((o) => o.value === value)?.label
                      )
                      .join(', ')
                  }
                >
                  {[
                    { value: '0', label: 'No pathology' },
                    ...safePathologies,
                  ].map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      <Checkbox
                        checked={selectedPathologies.some(
                          (s) => s.value === opt.value
                        )}
                      />
                      <ListItemText primary={opt.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          )}

          {/* Step 3: Physiological States */}
          {showStep3 && (
            <Paper variant="outlined" sx={{ p: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="phys-state-multiselect-label">
                  Select Physiological States (compatible)
                </InputLabel>
                <Select
                  labelId="phys-state-multiselect-label"
                  multiple
                  value={selectedPhysStates.map((s) => s.value)}
                  label="Select Physiological States (compatible)"
                  onChange={(e) =>
                    handleMultiSelectChange(
                      [
                        { value: '0', label: 'No physiological state' },
                        ...safePhysStates,
                      ],
                      safeSelectedPhysStates,
                      setSelectedPhysStates,
                      e
                    )
                  }
                  renderValue={(selected) =>
                    selected
                      .map(
                        (value) =>
                          [
                            { value: '0', label: 'No physiological state' },
                            ...safePhysStates,
                          ].find((o) => o.value === value)?.label
                      )
                      .join(', ')
                  }
                >
                  {[
                    { value: '0', label: 'No physiological state' },
                    ...safePhysStates,
                  ].map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      <Checkbox
                        checked={selectedPhysStates.some(
                          (s) => s.value === opt.value
                        )}
                      />
                      <ListItemText primary={opt.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          )}

          {/* Actions */}
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={saveSelectedConditions}
              disabled={!canSave}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
