import { Header, Box, SpaceBetween } from '@cloudscape-design/components';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductClaim } from '@nextcart/models';

export function ProductClaims({ claims }: { claims: ProductClaim[] }) {
  return (
    <Box padding="l">
      <Header variant="h3">Claim</Header>
      <SpaceBetween size="xs">
        {claims.length > 0 ? (
          claims.map((claim, index) => <Box key={index}>{claim.Claims}</Box>)
        ) : (
          <Box>Nessun claim disponibile</Box>
        )}
      </SpaceBetween>
    </Box>
  );
}
