import { Box, Typography, Stack } from '@mui/material';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductAllergen } from '@nextcart/models';

interface Props {
  allergens: ProductAllergen[];
}

export function ProductAllergens({ allergens }: Props) {
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Allergens
      </Typography>
      <Stack spacing={1}>
        {allergens.length > 0 ? (
          allergens.map((allergen, index) => (
            <Typography key={index} variant="body2">
              {allergen.allergen.allergenId} - {allergen.allergen.allergenName}
            </Typography>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No allergens available
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
