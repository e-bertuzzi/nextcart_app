import { Button } from '@cloudscape-design/components';
import { SummaryTable } from '@nextcart/ui-commons';

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
}

interface Cart {
  id: number;
  name: string;
  items: CartItem[];
}

interface Props {
  carts: Cart[];
  onRemoveCart: (cartId: number) => void;
  onRemoveItem?: (cartId: number, productId: string) => void;
}

export function CartTable({ carts, onRemoveCart, onRemoveItem }: Props) {
  return (
    <>
      {carts.map((cart) => {
        // Inseriamo una riga "placeholder" per la rimozione del cart se non ci sono prodotti
        const rows = cart.items.length > 0 ? cart.items : [{ productId: 'placeholder', name: '-', quantity: 0 }];

        return (
          <SummaryTable<CartItem>
            key={cart.id}
            items={rows}
            trackBy="productId"
            header={cart.name}
            columnDefinitions={[
              {
                id: 'name',
                header: 'Product',
                cell: (item) => item.name,
              },
              {
                id: 'quantity',
                header: 'Quantity',
                cell: (item) => item.quantity,
              },
              {
                id: 'removeItem',
                header: 'Remove Item',
                cell: (item) =>
                  onRemoveItem && item.productId !== 'placeholder' ? (
                    <Button
                      variant="inline-link"
                      onClick={() => onRemoveItem(cart.id, item.productId)}
                    >
                      Remove
                    </Button>
                  ) : null,
              },
              {
                id: 'removeCart',
                header: 'Remove Cart',
                cell: () => (
                  <Button
                    variant="inline-link"
                    onClick={() => onRemoveCart(cart.id)}
                  >
                    Remove Cart
                  </Button>
                ),
              },
            ]}
            variant="embedded"
            stickyHeader
          />
        );
      })}
    </>
  );
}
