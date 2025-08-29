// components/ProductCardList.tsx
import {
  Cards,
  Box,
  Button,
  Modal,
  Select,
  SpaceBetween,
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
  const { carts, addItem, message, setMessage } = useCart(userId);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCart, setSelectedCart] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedCart || !selectedProduct) return;
    try {
      await addItem(selectedCart.cartId, selectedProduct.productId, 1);
      setMessage({
        type: 'success',
        content: `${selectedProduct.name} added to ${selectedCart.name}!`,
      });
      setModalOpen(false);
      setSelectedCart(null);
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', content: 'Failed to add product.' });
    }
  };

  return (
    <Box>
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

      {/* Modal per scegliere il carrello */}
      <Modal
        visible={modalOpen}
        header={`Aggiungi ${selectedProduct?.name} al carrello`}
        onDismiss={() => setModalOpen(false)}
        closeAriaLabel="Chiudi"
        footer={
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={() => setModalOpen(false)}>Annulla</Button>
            <Button
              variant="primary"
              disabled={!selectedCart}
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
            selectedCart
              ? { label: selectedCart.name, value: selectedCart.cartId }
              : null
          }
          onChange={({ detail }) => {
            const cart = carts.find(
              (c) => c.cartId === detail.selectedOption.value
            );
            setSelectedCart(cart || null);
          }}
          options={carts.map((c) => ({
            label: c.name,
            value: c.cartId,
          }))}
        />
      </Modal>
    </Box>
  );
}
