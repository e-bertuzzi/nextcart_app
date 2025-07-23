import { Container, Box, Button, Flashbar, Spinner } from '@cloudscape-design/components';
import { useDiets } from './hook/use-diets';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserDietsTable } from './components/user-diet-table';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function DietSummary() {
  const { user, loading } = useUser();
  const userId = user?.id;  // userId può essere undefined se user è null

  const { selectedDiets, removeDiet, message, setMessage } = useDiets(userId);
  const navigate = useNavigate();

  const normalizedDiets = selectedDiets.map(diet => ({
    label: diet.label ?? 'N/A',
    value: Number(diet.value),
  }));

  if (loading) return <Spinner />; // oppure <div>Loading...</div>
  
    if (!user) {
      return <Navigate to="/login" />;
    }

  return (
    <Container header={
    <h1 style={{ color: 'green', fontWeight: 'bold' }}>
      Diets summary
    </h1>}>
      <Box margin="m">
        <UserDietsTable diets={normalizedDiets} onRemove={removeDiet} />
      </Box>

      {message && (
        <Box margin={{ bottom: 'm' }}>
          <Flashbar
            items={[
              {
                type: message.type,
                content: message.content,
                dismissible: true,
                onDismiss: () => setMessage(null),
              },
            ]}
          />
        </Box>
      )}

      <Button variant="primary" onClick={() => navigate('/diet/edit')}>
        Change diets
      </Button>
    </Container>
  );
}
