// components/AuthCard.tsx
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <Card sx={{ width: "100%", maxWidth: 400, p: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
            {subtitle}
          </Typography>
        )}
        <Box sx={{ mt: 2 }}>{children}</Box>
        {footer && (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {footer}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
