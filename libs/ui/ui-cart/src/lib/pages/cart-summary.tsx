import { useState } from 'react';
import { useCart } from '../hook/use-cart';
import { CartTable } from '../components/cart-table';
import {
  Button,
  Container,
  Box,
  Flashbar,
  SpaceBetween,
  Spinner,
  Modal,
} from '@cloudscape-design/components';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function UiCartPage() {
  const { user, loading } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const { carts, loadingCarts, removeCart, message, setMessage } = useCart(userId);

  // Stato modale conferma cancellazione
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState<number | null>(null);

  if (loading || loadingCarts) return <Spinner />;

  if (!user) return <Navigate to="/login" />;

  // Mostra il modale
  const handleRemoveClick = (cartId: number) => {
    setSelectedCartId(cartId);
    setConfirmOpen(true);
  };

  // Conferma la rimozione
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
    <Box margin="l">
      <Container
        header={
          <h1 style={{ color: 'green', fontWeight: 'bold' }}>
            Your Shopping Carts
          </h1>
        }
      >
        <FormLayout message={message} setMessage={setMessage}>
          {carts.length === 0 ? (
            <p>No carts yet. Click below to create one!</p>
          ) : (
            <CartTable carts={carts} onRemoveCart={handleRemoveClick} />
          )}

          <Button variant="primary" onClick={() => navigate('/cart/create')}>
            Add New Cart
          </Button>
        </FormLayout>

        {/* Modale di conferma */}
        <Modal
          visible={confirmOpen}
          header="Confirm removal"
          onDismiss={() => setConfirmOpen(false)}
          closeAriaLabel="Close modal"
          footer={
            <SpaceBetween direction="horizontal" size="xs">
              <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={confirmRemove}>
                Confirm
              </Button>
            </SpaceBetween>
          }
        >
          Are you sure you want to remove this cart?
        </Modal>
      </Container>
    </Box>
  );
}

function FormLayout({ children, message, setMessage }: any) {
  return (
    <SpaceBetween size="l">
      {message && (
        <Flashbar
          items={[
            {
              type: message.type,
              content: message.content,
              dismissible: true,
              onDismiss: () => setMessage(null),
            },
          ]}
        />
      )}
      {children}
    </SpaceBetween>
  );
}
