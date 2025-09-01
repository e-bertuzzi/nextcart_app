import { Header, Box, SpaceBetween } from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductDiet } from '@nextcart/models';

export function ProductDiets({ diets }: { diets: ProductDiet[] }) {
  return (
    <Box padding="l">
      <Header variant="h3">Diets</Header>
      <SpaceBetween size="xs">
        {diets.length > 0 ? (
          diets.map((diet, index) => (
            <Box key={index}>{diet.dietId || 'N/A'}</Box>
          ))
        ) : (
          <Box>No diets available</Box>
        )}
      </SpaceBetween>
    </Box>
  );
}
