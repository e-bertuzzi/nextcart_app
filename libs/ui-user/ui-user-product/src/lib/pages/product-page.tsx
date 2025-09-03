// pages/UiProduct.tsx
import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography } from '@mui/material';
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa';

export function UiProductPage() {
  const navigate = useNavigate();

  const cards = [
    {
      label: 'Products List',
      icon: <FaShoppingBag size={36} />,
      path: '/dashboard/products/list',
      gradient: 'linear-gradient(135deg, #2e7d32 30%, #66bb6a 100%)',
      description: 'View product list',
    },
    {
      label: 'Cart Section',
      icon: <FaShoppingCart size={36} />,
      path: '/dashboard/cart',
      gradient: 'linear-gradient(135deg, #388e3c 30%, #81c784 100%)',
      description: 'View cart list',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 6,
        px: 3,
        mt: -4,
        pb: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}
      >
        Shopping Overview
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 4, textAlign: 'center', maxWidth: 700 }}
      >
        Access the full product catalog or check your cart
      </Typography>

      {/* Container Flex responsive */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          width: '100%',
          maxWidth: 880,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              flex: '1 1 300px', // min 300px, cresce e si restringe
              height: 200,
              borderRadius: 4,
              background: card.gradient,
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-6px) scale(1.03)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.25)',
              },
            }}
            onClick={() => navigate(card.path)}
          >
            <Box sx={{ mb: 1 }}>{card.icon}</Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
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
