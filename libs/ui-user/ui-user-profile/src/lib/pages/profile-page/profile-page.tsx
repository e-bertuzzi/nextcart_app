// pages/UiProfilePage.tsx
import { useNavigate } from 'react-router-dom';
import { Box, Card, Typography } from '@mui/material';
import { FaUser, FaHeart, FaUtensils, FaUsers } from 'react-icons/fa';

export function UiProfilePage() {
  const navigate = useNavigate();

  const cards = [
    {
      label: 'Personal Info',
      icon: <FaUser size={36} />,
      path: '/dashboard/profile/edit-profile',
      color: '#4caf50',
      description: 'Edit your personal details',
    },
    {
      label: 'Health',
      icon: <FaHeart size={36} />,
      path: '/dashboard/profile/health',
      color: '#4caf50',
      description: 'Track your health information',
    },
    {
      label: 'Diet',
      icon: <FaUtensils size={36} />,
      path: '/dashboard/profile/diet',
      color: '#4caf50',
      description: 'Manage your diet plans',
    },
    {
      label: 'Family',
      icon: <FaUsers size={36} />,
      path: '/dashboard/profile/family',
      color: '#4caf50',
      description: 'Manage family profiles',
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
        variant="h4"
        sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}
      >
        Profile
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 4, textAlign: 'center', maxWidth: 700 }}
      >
        Manage your personal information and family profiles
      </Typography>

      {/* Flex container per le card */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          width: '100%',
          maxWidth: 900,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              flex: '1 1 220px', // cresce e si restringe, larghezza minima 220px
              maxWidth: 280,      // larghezza massima per card
              height: 200,
              borderRadius: 4,
              background: card.color,
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
