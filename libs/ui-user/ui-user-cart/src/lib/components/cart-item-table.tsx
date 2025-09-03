import { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { FaExclamationTriangle } from 'react-icons/fa';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  productId: string;
  cartItemId: string;
  name: string;
  quantity: number;
  product?: Product;
  warnings?: string[];
}

interface Props {
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
}

export function CartItemsTable({ items, onUpdateQuantity, onRemoveItem }: Props) {
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const navigate = useNavigate();

  const confirmRemove = () => {
    if (itemToRemove) {
      onRemoveItem(itemToRemove.cartItemId);
      setItemToRemove(null);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><b>Product</b></TableCell>
              <TableCell><b>Quantity</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="body1" color="text.secondary">
                    <b>This cart is empty.</b>
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.cartItemId}>
                  {/* Nome prodotto con link e warnings */}
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() =>
                        navigate(`/dashboard/products/${item.product?.productId}`)
                      }
                    >
                      {item.product?.name}
                    </Button>
                    {item.warnings && item.warnings.length > 0 && (
                      <Tooltip
                        title={
                          <div>
                            {item.warnings.map((w, idx) => (
                              <div key={idx}>
                                {w === 'NOT_COMPATIBLE_WITH_DIET'
                                  ? 'Not compatible with your diets'
                                  : w === 'NOT_COMPATIBLE_WITH_CONDITION'
                                  ? 'Not compatible with your health conditions'
                                  : 'Other incompatibility'}
                              </div>
                            ))}
                          </div>
                        }
                      >
                        <IconButton size="small" color="warning">
                          <FaExclamationTriangle fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>

                  {/* Quantità */}
                  <TableCell>{item.quantity}</TableCell>

                  {/* Azioni */}
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                    >
                      +
                    </Button>
                    <Button
                      size="small"
                      disabled={item.quantity <= 1}
                      onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                    >
                      -
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => setItemToRemove(item)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog di conferma rimozione */}
      <Dialog open={!!itemToRemove} onClose={() => setItemToRemove(null)}>
        <DialogTitle>Confirm removal</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove{' '}
            <b>{itemToRemove?.product?.name ?? 'this product'}</b> from the cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItemToRemove(null)}>Cancel</Button>
          <Button
            onClick={confirmRemove}
            color="error"
            variant="contained"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
