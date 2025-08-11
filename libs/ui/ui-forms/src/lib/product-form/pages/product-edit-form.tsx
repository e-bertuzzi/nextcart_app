import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Header,
  SpaceBetween,
  Flashbar,
  ColumnLayout,
} from '@cloudscape-design/components';

import { useEditProduct } from '../hooks/use-edit-product';
import { ProductFieldsGroup } from '../components/product-fields-group';

export function UiEditProduct() {
  const { id } = useParams<{ id: string }>();
  const {
    formData,
    loading,
    message,
    onChange,
    handleSubmit,
    categories,
    setMessage,
    claims,
    allergens,
    dietOptions,
    nutritionalInfos,
  } = useEditProduct(id ?? '');

  if (loading) return <div>Loading...</div>;

  return (
    <Box padding={{ vertical: 'xl', horizontal: 'l' }}>
      <ColumnLayout columns={1}>
        <Container
          header={
            <Header variant="h2">
              <Box color="text-status-success" fontWeight="bold">
                Edit Product
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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <ProductFieldsGroup
                formData={formData}
                onChange={onChange}
                disabled={loading}
                categories={categories}
                claims={claims}
                allergens={allergens}
                dietOptions={dietOptions}
                nutritionalInfos={nutritionalInfos}
              />

              <Box textAlign="center" margin={{ top: 'l' }}>
                <Button loading={loading} variant="primary">
                  Update Product
                </Button>
              </Box>
            </form>
          </SpaceBetween>
        </Container>
      </ColumnLayout>
    </Box>
  );
}
