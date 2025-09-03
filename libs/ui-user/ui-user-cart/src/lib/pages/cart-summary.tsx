import { useState } from 'react';
import { useCart } from '@nextcart/ui-cart';
import { CartTable } from '../components/cart-table';
import {
  Button,
  Container,
  Box,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function UiCartPage() {
  const { user, loading } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const { carts, loadingCarts, removeCart, message, setMessage } =
    useCart(userId);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState<number | null>(null);

  if (loading || loadingCarts)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!user) return <Navigate to="/login" />;

  const handleRemoveClick = (cartId: number) => {
    setSelectedCartId(cartId);
    setConfirmOpen(true);
  };

  const confirmRemove = async () => {
    if (!selectedCartId) return;
    try {
      await removeCart(selectedCartId);
      setMessage({ type: 'success', content: 'Cart removed successfully!' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', content: 'Failed to remove cart.' });
    } finally {
      setConfirmOpen(false);
      setSelectedCartId(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" color="green" gutterBottom>
        Your Shopping Carts
      </Typography>

      <FormLayout message={message} setMessage={setMessage}>
        {carts.length === 0 ? (
          <Typography>No carts yet. Click below to create one!</Typography>
        ) : (
          <CartTable
            carts={carts}
            onRemoveCart={handleRemoveClick}
            onViewCart={(cartId) => navigate(`/dashboard/cart/${cartId}`)}
          />
        )}

        {/* Pulsante separato, centrato e compatto */}
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard/cart/edit')}
            sx={{ maxWidth: 180, width: '100%' }}
          >
            Add New Cart
          </Button>
        </Box>
      </FormLayout>

      {/* Dialog di conferma */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm removal</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove this cart?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmRemove}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function FormLayout({ children, message, setMessage }: any) {
  return (
    <Stack spacing={3}>
      {/* Messaggio sopra la tabella */}
      {message && (
        <Box minHeight={60}>
          <Alert
            severity={message.type}
            variant="filled"
            onClose={() => setMessage(null)}
          >
            {message.content}
          </Alert>
        </Box>
      )}

      {children}
    </Stack>
  );
}
