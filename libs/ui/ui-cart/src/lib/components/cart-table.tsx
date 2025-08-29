import { useState } from 'react';
import { Button, Modal, SpaceBetween } from '@cloudscape-design/components';
import { SummaryTable } from '@nextcart/ui-commons';

interface Cart {
  cartId: number;
  name: string;
  items: { productId: string; name: string; quantity: number }[];
  createdAt: string;
}

interface Props {
  carts: Cart[];
  onRemoveCart: (cartId: number) => void;
  onViewCart?: (cartId: number) => void;
}

export function CartTable({ carts, onRemoveCart, onViewCart }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);

  const openConfirm = (cart: Cart) => {
    setSelectedCart(cart);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setSelectedCart(null);
  };

  const confirmRemove = () => {
    if (selectedCart) {
      onRemoveCart(selectedCart.cartId);
    }
    closeConfirm();
  };

  return (
    <SummaryTable<Cart>
      items={carts}
      trackBy="cartId"
      header="Your Carts"
      columnDefinitions={[
        {
          id: 'name',
          header: 'Cart Name',
          cell: (cart) =>
            onViewCart ? (
              <Button
                variant="inline-link"
                onClick={() => onViewCart(cart.cartId)}
              >
                {cart.name}
              </Button>
            ) : (
              cart.name
            ),
        },
        {
          id: 'createdAt',
          header: 'Created At',
          cell: (cart) =>
            new Date(cart.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
        },
        {
          id: 'quantity',
          header: 'Number of Products',
          cell: (cart) =>
            cart.items.reduce((sum, item) => sum + (item.quantity ?? 0), 0),
        },
        {
          id: 'actions',
          header: 'Actions',
          cell: (cart) => (
            <Button
              variant="inline-link"
              onClick={() => onRemoveCart(cart.cartId)}
            >
              Remove
            </Button>
          ),
        },
      ]}
      variant="embedded"
      stickyHeader
    />
  );
}
