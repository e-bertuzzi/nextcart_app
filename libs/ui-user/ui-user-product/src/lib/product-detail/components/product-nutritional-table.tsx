import { Container, Typography, Stack } from '@mui/material';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductNutritionalInfo } from '@nextcart/models';

interface Props {
  nutritionalInfo: ProductNutritionalInfo[];
}

export function ProductNutritionalTable({ nutritionalInfo }: Props) {
  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h6" gutterBottom>
        Nutritional Values
      </Typography>
      <Stack spacing={1}>
        {nutritionalInfo.length > 0 ? (
          nutritionalInfo.map((info, index) => (
            <Typography key={index} variant="body2">
              {info.nutrient?.nutrientIT ?? 'Unknown nutrient'}: {info.value ?? 'N/A'}
            </Typography>
          ))
        ) : (
          <Typography variant="body2">No nutritional information available</Typography>
        )}
      </Stack>
    </Container>
  );
}
