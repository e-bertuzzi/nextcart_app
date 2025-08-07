import { Header, Box, SpaceBetween } from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductAllergen } from '@nextcart/models';

export function ProductAllergens({ allergens }: { allergens: ProductAllergen[] }) {
  return (
    <Box padding="l">
      <Header variant="h3">Allergens</Header>
      <SpaceBetween size="xs">
        {allergens.length > 0 ? (
          allergens.map((allergen, index) => (
            <Box key={index}>{allergen.allergen.allergenId} - {allergen.allergen.allergenName}</Box>
          ))
        ) : (
          <Box>No allergens available</Box>
        )}
      </SpaceBetween>
    </Box>
  );
}
