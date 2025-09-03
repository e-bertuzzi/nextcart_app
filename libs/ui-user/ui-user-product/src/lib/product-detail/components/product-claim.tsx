import { Box, Typography, Stack } from '@mui/material';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductClaim } from '@nextcart/models';

interface Props {
  claims: ProductClaim[];
}

export function ProductClaims({ claims }: Props) {
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Claims
      </Typography>
      <Stack spacing={1}>
        {claims.length > 0 ? (
          claims.map((claim, index) => (
            <Typography key={index} variant="body2">
              {claim.claim.claimId} - {claim.claim?.description ?? 'Descrizione non disponibile'}
            </Typography>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No claim available
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
