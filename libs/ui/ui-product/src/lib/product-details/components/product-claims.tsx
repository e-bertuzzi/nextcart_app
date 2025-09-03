import { Header, Box, SpaceBetween } from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductClaim } from '@nextcart/models';

export function ProductClaims({ claims }: { claims: ProductClaim[] }) {
  return (
    <Box padding="l">
      <Header variant="h3">Claims</Header>
      <SpaceBetween size="xs">
        {claims.length > 0 ? (
          claims.map((claim, index) => {
            console.log(claim);
            return (
              <Box key={index}>
                {claim.claim.claimId} - {claim.claim?.description ?? 'Descrizione non disponibile'}
              </Box>
            );
          })
        ) : (
          <Box>No claim available</Box>
        )}
      </SpaceBetween>
    </Box>
  );
}
