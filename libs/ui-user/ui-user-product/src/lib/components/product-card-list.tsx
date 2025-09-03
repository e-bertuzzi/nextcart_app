import { useNavigate } from 'react-router-dom';
import { useState, memo } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
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
  const { compatible: dietCompatible } = useProductCompatibility(
    product,
    userDiets
  );
  const { compatible: nutrientCompatible } = useProductNutrientCompatibility(
    product,
    userNutrientConstraints
  );

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold">
        {product.name || product.itName}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        ID: {product.productId}
      </Typography>
      {!dietCompatible && (
        <Typography variant="body2" color="warning.main">
          ⚠ Not compatible with your diets
        </Typography>
      )}
      {!nutrientCompatible && (
        <Typography variant="body2" color="warning.main">
          ⚠ Not compatible with your health conditions
        </Typography>
      )}
    </Box>
  );
}

/** ✅ Card memoizzata */
const ProductCard = memo(function ProductCard({
  product,
  userDiets,
  userNutrientConstraints,
  onAddToCart,
}: {
  product: any;
  userDiets: { value: string }[];
  userNutrientConstraints: any[];
  onAddToCart: (product: any) => void;
}) {
  const navigate = useNavigate();

  return (
    <Card
      key={product.productId}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardHeader
        title={
          <ProductHeader
            product={product}
            userDiets={userDiets}
            userNutrientConstraints={userNutrientConstraints}
          />
        }
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Category: {product.productCategory?.category ?? 'N/A'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/dashboard/products/${product.productId}`)}
        >
          Details
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
});

/** ✅ Dialog separato */
function AddToCartDialog({
  open,
  onClose,
  product,
  carts,
  createNewCart,
  addItem,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  product: any;
  carts: any[];
  createNewCart: (name: string) => Promise<any>;
  addItem: (cartId: number, productId: string, qty: number, warnings: any[]) => Promise<any>;
  onSuccess: (msg: string) => void;
}) {
  const [selectedCart, setSelectedCart] = useState<any>(null);
  const [isCreatingCart, setIsCreatingCart] = useState(false);
  const [newCartName, setNewCartName] = useState('');

  const handleConfirm = async () => {
    if (!product) return;
    try {
      let targetCartId = selectedCart?.cartId;
      if (isCreatingCart && newCartName.trim() !== '') {
        const newCart = await createNewCart(newCartName);
        targetCartId = newCart.cartId;
      }
      if (!targetCartId) return;

      await addItem(targetCartId, product.productId, 1, [CartItemWarning.NONE]);
      onSuccess(`${product.name} added to cart.`);
      onClose();
      setSelectedCart(null);
      setIsCreatingCart(false);
      setNewCartName('');
    } catch (err) {
      console.error(err);
      onSuccess("Errore durante l'aggiunta del prodotto.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add product to cart</DialogTitle>
      <DialogContent dividers>
        <Select
          fullWidth
          displayEmpty
          value={
            isCreatingCart
              ? 'create_new'
              : selectedCart
              ? selectedCart.cartId
              : ''
          }
          onChange={(e) => {
            if (e.target.value === 'create_new') {
              setIsCreatingCart(true);
              setSelectedCart(null);
            } else {
              const cart = carts.find((c) => c.cartId === e.target.value);
              setSelectedCart(cart || null);
              setIsCreatingCart(false);
            }
          }}
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select cart
          </MenuItem>
          {carts.map((c) => (
            <MenuItem key={c.cartId} value={c.cartId}>
              {c.name}
            </MenuItem>
          ))}
          <MenuItem value="create_new">➕ Create new cart</MenuItem>
        </Select>

        {isCreatingCart && (
          <TextField
            fullWidth
            label="New cart name"
            value={newCartName}
            onChange={(e) => setNewCartName(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annulla</Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={
            (!isCreatingCart && !selectedCart) ||
            (isCreatingCart && newCartName.trim() === '')
          }
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/** ✅ Lista prodotti ottimizzata */
export function ProductCardList({
  products,
  userDiets,
}: {
  products: any[];
  userDiets: { label: string; value: string }[];
}) {
  const { user } = useUser();
  const userId = user?.id;
  const { carts, addItem, createNewCart } = useCart(userId);
  const { nutrientConstraints, loading: loadingConstraints } =
    useUserNutrientConstraints(userId);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  if (loadingConstraints) {
    return <Typography>Loading nutritional values...</Typography>;
  }

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gap={2}
      >
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            userDiets={userDiets}
            userNutrientConstraints={nutrientConstraints}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Box>

      <AddToCartDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        carts={carts}
        createNewCart={createNewCart}
        addItem={addItem}
        onSuccess={(msg) =>
          setFlashMessage({ type: msg.startsWith('Errore') ? 'error' : 'success', text: msg })
        }
      />

      {flashMessage && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={() => setFlashMessage(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={flashMessage.type}
            variant='filled'
            onClose={() => setFlashMessage(null)}
          >
            {flashMessage.text}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
