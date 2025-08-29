import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flashbar,
  SpaceBetween,
  Spinner,
  Table,
} from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useCart } from '../hook/use-cart';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';
import { removeItemByCartItemId, updateItemQuantity } from '../service/carts-service';

interface CartItem {
  productId: string;
  cartItemId: string;
  name: string;
  quantity: number;
  product?: Product;
}

export function UiCartDetailPage() {
  const { cartId } = useParams<{ cartId: string }>();
  const { user, loading } = useUser();
  const userId = user?.id;

  const {
    carts,
    loadingCarts,
    addItem,
    removeItem,
    message,
    setMessage,
    fetchUserCarts,
  } = useCart(userId);

  const [cart, setCart] = useState<any | null>(null);

  useEffect(() => {
    if (cartId && carts.length > 0) {
      const found = carts.find((c) => c.cartId === Number(cartId));
      setCart(found || null);
    }
  }, [cartId, carts]);

  if (loading || loadingCarts) return <Spinner />;

  if (!user) return <Navigate to="/login" />;

  if (!cart) return <p>Cart not found.</p>;

  const handleIncrease = async (cartItemId: string) => {
    try {
      await updateItemQuantity(cartItemId, 1); // usa solo cartItemId
      setMessage({ type: 'success', content: 'Quantity increased!' });
      await fetchUserCarts();
    } catch {
      setMessage({ type: 'error', content: 'Failed to increase quantity.' });
    }
  };

  const handleDecrease = async (cartItemId: string) => {
    try {
      await updateItemQuantity(cartItemId, -1); // decrementa
      setMessage({ type: 'success', content: 'Quantity decreased!' });
      await fetchUserCarts();
    } catch {
      setMessage({ type: 'error', content: 'Failed to decrease quantity.' });
    }
  };

  const handleRemove = async (cartItemId: string) => {
    try {
      await removeItemByCartItemId(cartItemId); // elimina specifico cartItem
      setMessage({ type: 'success', content: 'Product removed!' });
      await fetchUserCarts();
    } catch {
      setMessage({ type: 'error', content: 'Failed to remove product.' });
    }
  };

  return (
    <Box margin="l">
      <Container
        header={
          <h1 style={{ color: 'green', fontWeight: 'bold' }}>
            Cart: {cart.name}
          </h1>
        }
      >
        <FormLayout message={message} setMessage={setMessage}>
          <Table<CartItem>
            items={cart.items}
            trackBy="cartItemId"
            columnDefinitions={[
              {
                id: 'name',
                header: 'Product',
                cell: (item) => item.product?.name,
              },
              {
                id: 'quantity',
                header: 'Quantity',
                cell: (item) => item.quantity,
              },
              {
                id: 'actions',
                header: 'Actions',
                cell: (item) => (
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button
                      onClick={() =>
                        handleIncrease(item.cartItemId)
                      }
                    >
                      +
                    </Button>
                    <Button
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        handleDecrease(item.cartItemId)
                      }
                    >
                      -
                    </Button>
                    <Button
                      variant="inline-link"
                      onClick={() =>
                        handleRemove(item.cartItemId)
                      }
                    >
                      Remove
                    </Button>
                  </SpaceBetween>
                ),
              },
            ]}
          />
        </FormLayout>
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
