import { Card, CardContent, CardActions, Button, Box, Typography } from '@mui/material';
import React from 'react';

interface DashboardCardProps {
  label: string;
  description: string;
  iconName?: string | React.ReactNode;
  href: string;
}

export function DashboardCard({ label, description, iconName, href }: DashboardCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        {iconName && <Box sx={{ mb: 2 }}>{iconName}</Box>}
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button variant="contained" onClick={() => (window.location.href = href)}>
          Vai
        </Button>
      </CardActions>
    </Card>
  );
}
