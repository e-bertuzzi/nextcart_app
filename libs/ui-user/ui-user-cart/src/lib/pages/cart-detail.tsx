import { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
  Button,
  Typography,
} from '@mui/material';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useCart } from '@nextcart/ui-cart';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';
import {
  useProductCompatibility,
  useProductNutrientCompatibility,
  useUserDiets,
  useUserNutrientConstraints,
} from '@nextcart/ui-compatibility';

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
  const { userDiets, loading: loadingDiets } = useUserDiets(userId);
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
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!user) return <Navigate to="/login" />;
  if (!cart) return <Typography>Cart not found.</Typography>;

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
    <Box m={4}>
      <Container>
        <Typography variant="h5" fontWeight="bold" color="green" gutterBottom>
          Cart: {cart.name}
        </Typography>

        <FormLayout message={message} setMessage={setMessage}>
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
    <Stack spacing={3}>
      {/* Messaggio subito sopra il form */}
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
