import { Header, Box, SpaceBetween } from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductNutritionalInfo } from '@nextcart/models';

export function ProductNutritionalTable({
  nutritionalInfo,
}: {
  nutritionalInfo: ProductNutritionalInfo[];
}) {
  return (
    <Box padding="l">
      <Header variant="h3">Nutritional Values</Header>
      <SpaceBetween size="xs">
        {nutritionalInfo.length > 0 ? (
          nutritionalInfo.map((info, index) => (
            <Box key={index}>
              {info.nutrient.nutrientIT}: {info.value}
            </Box>
          ))
        ) : (
          <Box>No nutritional information available</Box>
        )}
      </SpaceBetween>
    </Box>
  );
}
