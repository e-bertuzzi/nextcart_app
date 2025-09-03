import { Container, Typography, Stack } from '@mui/material';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductDiet } from '@nextcart/models';

interface Props {
  diets: ProductDiet[];
}

export function ProductDiets({ diets }: Props) {
  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h6" gutterBottom>
        Diets
      </Typography>
      <Stack spacing={1}>
        {diets.length > 0 ? (
          diets.map((diet, index) => (
            <Typography key={index} variant="body2">
              {diet.dietId || 'N/A'}
            </Typography>
          ))
        ) : (
          <Typography variant="body2">No diets available</Typography>
        )}
      </Stack>
    </Container>
  );
}
