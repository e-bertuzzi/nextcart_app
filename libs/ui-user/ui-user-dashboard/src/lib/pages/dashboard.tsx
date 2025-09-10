import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography } from '@mui/material';
import { FaUser, FaHeart, FaShoppingCart, FaChartBar, FaRunning } from 'react-icons/fa';

export function UiDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      label: 'Profile',
      icon: <FaUser size={36} />,
      path: '/dashboard/profile',
      color: '#4caf50',
      description: 'Manage your personal info',
    },

    {
      label: 'Lifestyle Overview',
      icon: <FaRunning size={36} />,
      path: '/dashboard/lifestyle',
      color: '#4caf50',
      description: 'Get an overview of your lifestyle habits',
    },

    {
      label: 'Products',
      icon: <FaShoppingCart size={36} />,
      path: '/dashboard/products',
      color: '#4caf50',
      description: 'Manage and buy products',
    },
    {
      label: 'Analytics',
      icon: <FaChartBar size={36} />,
      path: '/dashboard/analytics',
      color: '#4caf50',
      description: 'View stats and progress',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 6,
        px: 3,
        mt: -4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}
      >
        Welcome to Your Dashboard
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 4, textAlign: 'center', maxWidth: 700 }}
      >
        Select a section to manage your information and activities
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          maxWidth: 900,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              flex: '1 1 calc(50% - 12px)',
              maxWidth: 380,
              minWidth: 220,
              height: 220,
              borderRadius: 3,
              background: card.color,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              },
            }}
            onClick={() => navigate(card.path)}
          >
            <Box sx={{ mb: 1 }}>{card.icon}</Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {card.label}
            </Typography>
            <Typography variant="body2" sx={{ px: 2 }}>
              {card.description}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
