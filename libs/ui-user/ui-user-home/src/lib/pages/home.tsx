import { Box } from '@mui/material';
import { HeroSection } from '../components/hero-section';
import { FeaturesSection } from '../components/features-section';

export function UiHome() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <HeroSection />
      <FeaturesSection />
    </Box>
  );
}

export default UiHome;
