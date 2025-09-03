import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export function UiNotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/homepage');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight='calc(100vh - 64px)'
      textAlign="center"
      p={4}
    >
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ mt: 3 }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
}
