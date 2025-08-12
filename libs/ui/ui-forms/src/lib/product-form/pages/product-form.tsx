import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Header,
  SpaceBetween,
  Flashbar,
  ColumnLayout,
} from '@cloudscape-design/components';

import { useAddProduct } from '../hooks/use-add-product';
import { ProductFieldsGroup } from '../components/product-fields-group';
import { useLocation } from 'react-router-dom';

export function UiAddProduct() {
  const location = useLocation();

  const {
    formData,
    loading,
    message,
    onChange,
    handleSubmit,
    setMessage,
    categories,
    claims,
    allergens,
    dietOptions,
    nutritionalInfos,
  } = useAddProduct();

  useEffect(() => {
    if (location.state?.newId) {
      onChange('productId', location.state.newId);
    }
  }, [location.state?.newId, onChange]);

  return (
    <Box padding={{ vertical: 'xl', horizontal: 'l' }}>
      <ColumnLayout columns={1}>
        <Container
          header={
            <Header variant="h2">
              <Box color="text-status-success" fontWeight="bold">
                Add new product
              </Box>
            </Header>
          }
        >
          <SpaceBetween size="l">
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

            <ProductFieldsGroup
              formData={formData}
              onChange={onChange}
              disabled={loading}
              categories={categories}
              claims={claims}
              disableProductId={false}
              allergens={allergens}
              dietOptions={dietOptions} // <-- qui, NON diets (Diet[]), ma dietOptions (Option[])
              nutritionalInfos={nutritionalInfos}
            />

            <Box textAlign="center">
              <Button
                onClick={handleSubmit}
                loading={loading}
                variant="primary"
              >
                Add Product
              </Button>
            </Box>
          </SpaceBetween>
        </Container>
      </ColumnLayout>
    </Box>
  );
}
