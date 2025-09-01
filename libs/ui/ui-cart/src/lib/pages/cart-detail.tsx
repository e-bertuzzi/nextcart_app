import { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Flashbar,
  SpaceBetween,
  Spinner,
  Button,
} from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useCart } from '../hook/use-cart';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';
import {
  useProductCompatibility,
  useProductNutrientCompatibility,
} from '@nextcart/ui-compatibility';
import { useUserDiets } from '@nextcart/ui-compatibility';
import { useUserNutrientConstraints } from '@nextcart/ui-compatibility';

import { CartItemsTable } from '../components/cart-item-table';

interface CartItem {
  productId: string;
  cartItemId: string;
  name: string;
  quantity: number;
  product?: Product;
  warnings?: string[];
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
  } = useCart(userId);

  const [cart, setCart] = useState<any | null>(null);

  // 🔹 Recupero diete e vincoli
  const {
    userDiets,
    loading: loadingDiets,
  } = useUserDiets(userId);
  const { nutrientConstraints, loading: loadingConstraints } =
    useUserNutrientConstraints(userId);

  // 🔹 Seleziona carrello corrente
  useEffect(() => {
    if (cartId && carts.length > 0) {
      const found = carts.find((c) => c.cartId === Number(cartId));
      setCart(found || null);
    }
  }, [cartId, carts]);

  if (loading || loadingCarts || loadingDiets || loadingConstraints)
    return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  if (!cart) return <p>Cart not found.</p>;

  const cartItemsWithWarnings = cart.items.map((item: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { compatible: dietCompatible } = useProductCompatibility(
      item.product,
      userDiets
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { compatible: nutrientCompatible } = useProductNutrientCompatibility(
      item.product,
      nutrientConstraints
    );

    const warnings: string[] = [];
    if (!dietCompatible) warnings.push('NOT_COMPATIBLE_WITH_DIET');
    if (!nutrientCompatible) warnings.push('NOT_COMPATIBLE_WITH_CONDITION');

    return { ...item, warnings };
  });

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
          <Button variant="link" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>

          <CartItemsTable
            items={cartItemsWithWarnings}
            onUpdateQuantity={updateItemQuantity}
            onRemoveItem={removeItem}
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
