import React, { useState } from 'react';
import {
  Button,
  Input,
  SpaceBetween,
  Link,
  Alert,
} from '@cloudscape-design/components';
import { useProductExists } from '../hook/use-product-check';
import { useNavigate } from 'react-router-dom';

export function UiProductCheck() {
  const [productId, setProductId] = useState('');
  const { exists, loading, checkExists } = useProductExists();
  const navigate = useNavigate();

  const handleCheck = async () => {
    try {
      await checkExists(productId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Errore nella verifica');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <SpaceBetween size="m">
        <Input
          placeholder="Inserisci ID prodotto"
          value={productId}
          onChange={({ detail }) => setProductId(detail.value)}
          ariaLabel="Inserisci ID prodotto"
        />

        <Button
          onClick={handleCheck}
          disabled={loading || !productId.trim()}
          loading={loading}
          variant="primary"
        >
          Verifica
        </Button>

        {exists === true && (
          <Alert
            type="success"
            header="Prodotto trovato!"
            dismissible={false}
            action={
              <Link href={`/products/${productId}/edit`} external={false}>
                Edit product
              </Link>
            }
          />
        )}

        {exists === false && (
        <Alert
          type="error"
          header="Prodotto non trovato."
          dismissible={false}
          action={
            <Link
              href="#"
              onFollow={(event) => {
                event.preventDefault();
                navigate('/products/add', { state: { newId: productId } });
              }}
            >
              Add new product
            </Link>
          }
        />
      )}
      </SpaceBetween>
    </div>
  );
}
