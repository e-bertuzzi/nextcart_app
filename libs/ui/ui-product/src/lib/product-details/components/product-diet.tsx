import { Header, Box, SpaceBetween } from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductDiet } from '@nextcart/models';

export function ProductDiets({ diets }: { diets: ProductDiet[] }) {
    console.log("diete ", diets);
  return (
    <Box padding="l">
      <Header variant="h3">Diete</Header>
      <SpaceBetween size="xs">
        {diets.length > 0 ? (
          diets.map((diet, index) => (
            <Box key={index}>{diet.dietId || 'Dieta non disponibile'}</Box>
          ))
        ) : (
          <Box>Nessuna dieta disponibile</Box>
        )}
      </SpaceBetween>
    </Box>
  );
}
