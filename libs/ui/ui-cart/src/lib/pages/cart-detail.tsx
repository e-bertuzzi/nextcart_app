import { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Flashbar,
  SpaceBetween,
  Spinner,
  Table,
  Button,
} from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useCart } from '../hook/use-cart';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';

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
  const navigate = useNavigate();

  const {
    carts,
    loadingCarts,
    removeItem,
    updateItemQuantity,
    message,
    setMessage,
    fetchUserCarts,
  } = useCart(userId);

  const [cart, setCart] = useState<any | null>(null);

  // Seleziona il carrello corrente
  useEffect(() => {
    if (cartId && carts.length > 0) {
      const found = carts.find((c) => c.cartId === Number(cartId));
      setCart(found || null);
    }
  }, [cartId, carts]);

  if (loading || loadingCarts) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  if (!cart) return <p>Cart not found.</p>;

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
          <Button
            variant="link"
            onClick={() => navigate(-1)}
          >
            &larr; Back
          </Button>

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
                      onClick={() => updateItemQuantity(item.cartItemId, 1)}
                    >
                      +
                    </Button>
                    <Button
                      disabled={item.quantity <= 1}
                      onClick={() => updateItemQuantity(item.cartItemId, -1)}
                    >
                      -
                    </Button>
                    <Button
                      variant="inline-link"
                      onClick={() => removeItem(item.cartItemId)}
                    >
                      Remove
                    </Button>
                  </SpaceBetween>
                ),
              },
            ]}
            empty={
              <Box textAlign="center" color="inherit">
                <b>This cart is empty.</b>
              </Box>
            }
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
