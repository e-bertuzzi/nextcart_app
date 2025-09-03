import React from 'react';
import { Box } from '@mui/material';

interface DashboardGridProps {
  children: React.ReactNode;
  columns?: string; // esempio: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
}

export function DashboardGrid({ children, columns }: DashboardGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: columns
          ? columns
              .replace('grid-cols-', '')
              .split(' ')
              .map((c) => `repeat(${parseInt(c)}, 1fr)`)
              .join(' ')
          : 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 3,
      }}
    >
      {children}
    </Box>
  );
}
