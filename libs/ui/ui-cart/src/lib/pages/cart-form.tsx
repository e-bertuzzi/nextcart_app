import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormField,
  Input,
  SpaceBetween,
  Flashbar,
  Spinner,
} from '@cloudscape-design/components';
import { useCart } from '../hook/use-cart';
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

  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" />;

  const handleSubmit = async (redirectPath: string) => {
    if (!cartName.trim()) {
      setError('Cart name is required.');
      return;
    }
    setError(null);

    await createNewCart(cartName); // ✅ usa l'hook aggiornato
    setCartName(''); // pulisce il form
    setTimeout(() => {
      navigate(redirectPath);
    }, 2000);
  };

  return (
    <Box margin="l">
      <Container header={<h2>Create New Cart</h2>}>
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

          <FormField label="Cart Name" errorText={error}>
            <Input
              value={cartName}
              onChange={({ detail }) => setCartName(detail.value)}
              placeholder="Enter cart name"
            />
          </FormField>

          <SpaceBetween direction="horizontal" size="s">
            <Button
              variant="primary"
              onClick={() => handleSubmit('/dashboard')}
            >
              Save Cart
            </Button>

            <Button variant="link" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </SpaceBetween>
        </SpaceBetween>
      </Container>
    </Box>
  );
}
