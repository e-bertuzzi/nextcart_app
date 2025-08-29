import { Button } from '@cloudscape-design/components';
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
  return (
    <SummaryTable<Cart>
      items={carts}
      trackBy="id"
      header="Your Carts"
      columnDefinitions={[
        {
          id: 'name',
          header: 'Cart Name',
          cell: (cart) => cart.name,
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
          cell: (cart) => cart.items.reduce((sum, item) => sum + (item.quantity ?? 0), 0),
        },
        {
          id: 'actions',
          header: 'Actions',
          cell: (cart) => (
            <div style={{ display: 'flex', gap: '8px' }}>
              {onViewCart && (
                <Button variant="inline-link" onClick={() => onViewCart(cart.cartId)}>
                  View
                </Button>
              )}
              <Button variant="inline-link" onClick={() => onRemoveCart(cart.cartId)}>
                Remove
              </Button>
            </div>
          ),
        },
      ]}
      variant="embedded"
      stickyHeader
    />
  );
}
