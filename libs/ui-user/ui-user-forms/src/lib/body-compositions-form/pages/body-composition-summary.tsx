import { useBodyCompositions } from '@nextcart/ui-forms';
import { UserBodyCompositionsTable } from '../components/body-composition-table';
import {
  Button,
  Container,
  Box,
  Typography,
  Alert,
  Stack,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function UiBodyPage() {
  const { user, loading } = useUser();
  const userId = user?.id ?? 0;

  const { compositions, removeComposition, message, setMessage } =
    useBodyCompositions(userId);

  const navigate = useNavigate();

  const handleEdit = (record: any) => {
    navigate('/dashboard/lifestyle/body/edit', { state: { record } });
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Intestazione centrata */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: 'green' }}
        >
          Body Composition Summary
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Track and monitor your body composition over time
        </Typography>
      </Box>

      {/* Layout principale con spazio in fondo */}
      <FormLayout message={message} setMessage={setMessage} pb={6}>
        {compositions.length === 0 ? (
          <Typography align="center">No body composition records available.</Typography>
        ) : (
          <Paper
            variant="outlined"
            sx={{ p: 3, borderRadius: 2, width: '100%', overflowX: 'auto' }}
          >
            <UserBodyCompositionsTable
              compositions={compositions}
              onRemove={removeComposition}
              onEdit={handleEdit}
            />
          </Paper>
        )}

        {/* Pulsante centrato e con margine inferiore */}
        <Box mt={3} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/dashboard/lifestyle/body/edit')}
          >
            Add new body composition
          </Button>
        </Box>
      </FormLayout>
    </Container>
  );
}

function FormLayout({
  children,
  message,
  setMessage,
  pb = 0, // padding bottom opzionale
}: {
  children: React.ReactNode;
  message: any;
  setMessage: (msg: any) => void;
  pb?: number;
}) {
  return (
    <Stack spacing={3} pb={pb}>
      {message && (
        <Alert
          severity={message.type === 'error' ? 'error' : 'success'}
          onClose={() => setMessage(null)}
        >
          {message.content}
        </Alert>
      )}
      {children}
    </Stack>
  );
}
