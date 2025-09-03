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
import { useCart } from '@nextcart/ui-cart';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function UiCartForm() {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const userId = user?.id;

  const { createNewCart, message, setMessage } = useCart(userId);

  const [cartName, setCartName] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!user) return <Navigate to="/login" />;

  const handleSubmit = async () => {
    if (!cartName.trim()) {
      setError('Cart name is required.');
      return;
    }
    setError(null);

    await createNewCart(cartName);
    setCartName('');
  };

  return (
    <Box m={4}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Stack spacing={3}>
            {/* Titolo */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Create New Cart
            </Typography>

            {/* Messaggio inline */}
            {message && (
              <Alert
                severity={message.type === 'error' ? 'error' : 'success'}
                variant="filled"
                onClose={() => setMessage(null)}
              >
                {message.content}
              </Alert>
            )}

            {/* Campo input */}
            <TextField
              label="Cart Name"
              value={cartName}
              onChange={(e) => setCartName(e.target.value)}
              placeholder="Enter cart name"
              error={Boolean(error)}
              helperText={error}
              fullWidth
            />

            {/* Pulsanti */}
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save Cart
              </Button>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
