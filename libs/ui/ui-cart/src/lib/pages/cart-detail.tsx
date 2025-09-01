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
  StatusIndicator,
  Popover,
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
import { useUserDiets } from '@nextcart/ui-compatibility'; // hook personalizzato per le diete
import { useUserNutrientConstraints } from '@nextcart/ui-compatibility'; // hook per vincoli nutrizionali

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
    error: dietsError,
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
    console.log('Processing item:', item.product?.name);
    console.log('item', item)
    console.log('Product diets:', item.product?.productDiets);
    console.log('User diets:', userDiets);
    console.log(
      'Product nutrients:',
      item.product?.nutritionalInformationValues
    );
    console.log('User nutrient constraints:', nutrientConstraints);

    console.log('Full product object:', item.product);

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
          <Table<CartItem>
            items={cartItemsWithWarnings}
            trackBy="cartItemId"
            columnDefinitions={[
              {
                id: 'name',
                header: 'Product',
                cell: (item) => (
                  <SpaceBetween direction="horizontal" size="xs">
                    <span>{item.product?.name}</span>
                    {item.warnings && item.warnings.length > 0 && (
                      <Popover
                        position="top"
                        size="small"
                        content={
                          <Box fontSize="body-s">
                            {item.warnings
                              .map((w) =>
                                w === 'NOT_COMPATIBLE_WITH_DIET'
                                  ? 'Not compatible with your diets'
                                  : w === 'NOT_COMPATIBLE_WITH_CONDITION'
                                  ? 'Not compatible with your health conditions'
                                  : 'Other incompatibility'
                              )
                              .join(', ')}
                          </Box>
                        }
                      >
                        <div
                          style={{ display: 'inline-block', cursor: 'help' }}
                        >
                          <StatusIndicator type="warning" />
                        </div>
                      </Popover>
                    )}
                  </SpaceBetween>
                ),
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
