import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Box
    sx={{
      textAlign: 'center',
      px: 2,
      py: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',  // centro orizzontale
      justifyContent: 'flex-start', // parte dall’alto
      gap: 1.5, // spazio tra icon/title/description
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // centro verticale e orizzontale
        fontSize: 48, // icona più grande
        color: 'success.main',
      }}
    >
      {icon}
    </Box>

    <Typography
      variant="h6"
      color="success.dark"
      sx={{ mt: 1, mb: 0.5 }}
    >
      {title}
    </Typography>

    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ maxWidth: 280 }}
    >
      {description}
    </Typography>
  </Box>
);
