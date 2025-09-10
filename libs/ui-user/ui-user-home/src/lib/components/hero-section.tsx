import { Box, Typography, Container } from '@mui/material';

export const HeroSection = () => (
  <Container maxWidth="md" sx={{ textAlign: 'center', py: 6 }}>
    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
      Welcome to <Box component="span" color="success.dark">NextCart</Box>
    </Typography>
    <Typography variant="h6" color="text.secondary">
      Your ally for a healthy, conscious and sustainable lifestyle. Monitor spending, health and much more in one place.
    </Typography>
  </Container>
);
