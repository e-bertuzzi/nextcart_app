import {
  Cards,
  Box,
  Button,
  Modal,
  Select,
  SpaceBetween,
  Input,
  Flashbar,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useCart } from '@nextcart/ui-cart';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  useProductCompatibility,
  useProductNutrientCompatibility,
  useUserNutrientConstraints,
} from '@nextcart/ui-compatibility';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CartItemWarning } from '@nextcart/enum';


// 🔹 Header del prodotto con compatibilità
function ProductHeader({
  product,
  userDiets,
  userNutrientConstraints,
}: {
  product: any;
  userDiets: { value: string }[];
  userNutrientConstraints: {
    nutrientId: string;
    minQuantity?: number;
    maxQuantity?: number;
  }[];
}) {
  const { compatible: dietCompatible } = useProductCompatibility(product, userDiets);
  const { compatible: nutrientCompatible } = useProductNutrientCompatibility(product, userNutrientConstraints);

  return (
    <Box fontWeight="bold" fontSize="heading-m">
      {product.name || product.itName}
      <Box fontWeight="light">ID: {product.productId}</Box>
      {!dietCompatible && (
        <Box color="text-status-warning" fontSize="body-s">
          ⚠ Not compatible with your diets
        </Box>
      )}
      {!nutrientCompatible && (
        <Box color="text-status-warning" fontSize="body-s">
          ⚠ Not compatible with your health conditions
        </Box>
      )}
    </Box>
  );
}


export function ProductCardList({
  products,
  userDiets,
}: {
  products: any[];
  userDiets: { label: string; value: string }[];
}) {
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;
  const { carts, addItem, createNewCart } = useCart(userId);

  const { nutrientConstraints, loading: loadingConstraints } = useUserNutrientConstraints(userId);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedProductWarnings, setSelectedProductWarnings] = useState<CartItemWarning[]>([CartItemWarning.NONE]);
  const [selectedCart, setSelectedCart] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreatingCart, setIsCreatingCart] = useState(false);
  const [newCartName, setNewCartName] = useState('');
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  // 🔹 Precalcolo opzioni carrelli (evita ricostruzioni inutili)
  const cartOptions = useMemo(
    () => [
      ...carts.map((c) => ({ label: c.name, value: c.cartId })),
      { label: '➕ Crea nuova spesa', value: 'create_new' },
    ],
    [carts]
  );

  // 🔹 Apertura modal con calcolo warning
  const handleAddToCart = useCallback(
    (product: any) => {
      setSelectedProduct(product);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { compatible: dietCompatible } = useProductCompatibility(product, userDiets);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { compatible: nutrientCompatible } = useProductNutrientCompatibility(product, nutrientConstraints);

      const warnings: CartItemWarning[] = [];
      if (!dietCompatible) warnings.push(CartItemWarning.NOT_COMPATIBLE_WITH_DIET);
      if (!nutrientCompatible) warnings.push(CartItemWarning.NOT_COMPATIBLE_WITH_CONDITION);
      if (warnings.length === 0) warnings.push(CartItemWarning.NONE);

      setSelectedProductWarnings(warnings);
      setModalOpen(true);
    },
    [userDiets, nutrientConstraints]
  );

  // 🔹 Conferma aggiunta
  const handleConfirm = useCallback(async () => {
    if (!selectedProduct) return;

    try {
      let targetCartId = selectedCart?.cartId;

      if (isCreatingCart && newCartName.trim() !== '') {
        const newCart = await createNewCart(newCartName);
        targetCartId = newCart.cartId;
      }

      if (!targetCartId) return;

      await addItem(targetCartId, selectedProduct.productId, 1, selectedProductWarnings);

      setFlashMessage(`${selectedProduct.name} added to cart...`);

      setTimeout(() => {
        setFlashMessage(null);
        setModalOpen(false);
      }, 2000);

      // reset stati
      setSelectedProduct(null);
      setSelectedProductWarnings([CartItemWarning.NONE]);
      setSelectedCart(null);
      setIsCreatingCart(false);
      setNewCartName('');
    } catch (err) {
      console.error(err);
      setFlashMessage("Errore durante l'aggiunta del prodotto.");
      setTimeout(() => setFlashMessage(null), 2500);
    }
  }, [selectedProduct, selectedCart, isCreatingCart, newCartName, createNewCart, addItem, selectedProductWarnings]);

  if (loadingConstraints) {
    return <Box>Caricamento vincoli nutrizionali...</Box>;
  }

  return (
    <Box>
      <Cards
        items={products}
        cardDefinition={{
          header: (item) => (
            <ProductHeader
              product={item}
              userDiets={userDiets}
              userNutrientConstraints={nutrientConstraints}
            />
          ),
          sections: [
            {
              id: 'category',
              content: (item) => (
                <Box color="text-body-secondary">
                  Category: {item.productCategory?.category ?? 'N/A'}
                </Box>
              ),
            },
            {
              id: 'actions',
              content: (item) => (
                <SpaceBetween direction="horizontal" size="xs">
                  <Button variant="primary" onClick={() => navigate(`/dashboard/products/${item.productId}`)}>
                    Details
                  </Button>
                  <Button iconName="add-plus" variant="primary" onClick={() => handleAddToCart(item)}>
                    Add to cart
                  </Button>
                </SpaceBetween>
              ),
            },
          ],
        }}
        loadingText="Caricamento prodotti..."
        empty="Nessun prodotto disponibile."
      />

      <Modal
        visible={modalOpen}
        header="Aggiungi prodotto al carrello"
        onDismiss={() => setModalOpen(false)}
        closeAriaLabel="Chiudi"
        footer={
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={() => setModalOpen(false)}>Annulla</Button>
            <Button
              variant="primary"
              disabled={(!isCreatingCart && !selectedCart) || (isCreatingCart && newCartName.trim() === '')}
              onClick={handleConfirm}
            >
              Conferma
            </Button>
          </SpaceBetween>
        }
      >
        <Select
          placeholder="Seleziona un carrello"
          selectedOption={
            isCreatingCart
              ? { label: '➕ Crea nuova spesa', value: 'create_new' }
              : selectedCart
              ? { label: selectedCart.name, value: selectedCart.cartId }
              : null
          }
          onChange={({ detail }) => {
            if (detail.selectedOption.value === 'create_new') {
              setIsCreatingCart(true);
              setSelectedCart(null);
            } else {
              const cart = carts.find((c) => c.cartId === detail.selectedOption.value);
              setSelectedCart(cart || null);
              setIsCreatingCart(false);
            }
          }}
          options={cartOptions}
        />

        {isCreatingCart && (
          <Box margin={{ top: 's' }}>
            <Input placeholder="Nome nuova spesa" value={newCartName} onChange={({ detail }) => setNewCartName(detail.value)} />
          </Box>
        )}

        {flashMessage && (
          <Box margin={{ top: 's' }}>
            <Flashbar
              items={[
                {
                  type: 'success',
                  content: flashMessage,
                  dismissible: true,
                  onDismiss: () => setFlashMessage(null),
                },
              ]}
            />
          </Box>
        )}
      </Modal>
    </Box>
  );
}
