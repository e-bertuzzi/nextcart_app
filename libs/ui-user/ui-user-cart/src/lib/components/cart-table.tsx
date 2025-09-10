import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Cart Name</b>
            </TableCell>
            <TableCell>
              <b>Created At</b>
            </TableCell>
            <TableCell>
              <b>Number of Products</b>
            </TableCell>
            <TableCell>
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carts.map((cart) => (
            <TableRow key={cart.cartId}>
              <TableCell>
                <Button
                  variant="text"
                  onClick={() =>
                    onViewCart
                      ? onViewCart(cart.cartId)
                      : navigate(`/dashboard/cart/${cart.cartId}`)
                  }
                  sx={{
                    fontWeight: 'bold', // testo in grassetto
                    color: '#2e7d32', // verde scuro
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.08)', // leggero sfondo verde al hover
                      borderColor: '#1b5e20', // bordo più scuro al hover
                    },
                  }}
                >
                  {cart.name}
                </Button>
              </TableCell>
              <TableCell>
                {new Date(cart.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell>
                {cart.items.reduce(
                  (sum, item) => sum + (item.quantity ?? 0),
                  0
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onRemoveCart(cart.cartId)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
