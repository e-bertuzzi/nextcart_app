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
import { useState } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useCart } from '@nextcart/ui-cart';

export function ProductCardList({ products }: { products: any[] }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;
  const { carts, addItem, createNewCart } = useCart(userId);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCart, setSelectedCart] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreatingCart, setIsCreatingCart] = useState(false);
  const [newCartName, setNewCartName] = useState('');

  // Stato per Flashbar temporanea dentro il modal
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setModalOpen(true);
    setFlashMessage(null); // reset messaggio
  };

  const handleConfirm = async () => {
    if (!selectedProduct) return;

    try {
      let targetCartId = selectedCart?.cartId;

      if (isCreatingCart && newCartName.trim() !== '') {
        const newCart = await createNewCart(newCartName);
        targetCartId = newCart.cartId;
      }

      if (!targetCartId) return;

      await addItem(targetCartId, selectedProduct.productId, 1);

      // Mostra Flashbar verde temporanea sotto la Select
      setFlashMessage(`${selectedProduct.name} aggiunto al carrello!`);
      setTimeout(() => setFlashMessage(null), 2500);

      // reset stato prodotto selezionato ma lascia il modal aperto
      setSelectedProduct(null);
      setSelectedCart(null);
      setIsCreatingCart(false);
      setNewCartName('');
    } catch (err) {
      console.error(err);
      setFlashMessage("Errore durante l'aggiunta del prodotto.");
      setTimeout(() => setFlashMessage(null), 2500);
    }
  };

  return (
    <Box>
      <Cards
        items={products}
        cardDefinition={{
          header: (item) => (
            <Box fontWeight="bold" fontSize="heading-m">
              {item.name || item.itName}{' '}
              <Box fontWeight="light">ID: {item.productId}</Box>
            </Box>
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
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/products/${item.productId}`)}
                  >
                    Details
                  </Button>
                  <Button
                    iconName="add-plus"
                    variant="primary"
                    onClick={() => handleAddToCart(item)}
                  >
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
        header={`Aggiungi prodotto al carrello`}
        onDismiss={() => setModalOpen(false)}
        closeAriaLabel="Chiudi"
        footer={
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={() => setModalOpen(false)}>Annulla</Button>
            <Button
              variant="primary"
              disabled={
                (!isCreatingCart && !selectedCart) ||
                (isCreatingCart && newCartName.trim() === '')
              }
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
              const cart = carts.find(
                (c) => c.cartId === detail.selectedOption.value
              );
              setSelectedCart(cart || null);
              setIsCreatingCart(false);
            }
          }}
          options={[
            ...carts.map((c) => ({
              label: c.name,
              value: c.cartId,
            })),
            { label: '➕ Crea nuova spesa', value: 'create_new' },
          ]}
        />

        {isCreatingCart && (
          <Box margin={{ top: 's' }}>
            <Input
              placeholder="Nome nuova spesa"
              value={newCartName}
              onChange={({ detail }) => setNewCartName(detail.value)}
            />
          </Box>
        )}

        {/* Flashbar temporanea sotto la Select */}
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
