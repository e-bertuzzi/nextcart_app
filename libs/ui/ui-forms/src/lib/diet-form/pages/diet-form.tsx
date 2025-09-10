import {
  Multiselect,
  Button,
  Container,
  Box,
  Flashbar,
  Spinner,
  SpaceBetween, // 👈 aggiunto
} from '@cloudscape-design/components';
import { useDiets } from '../hook/use-diets';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { Navigate, useNavigate } from 'react-router-dom';

export function UiDietEdit() {
  const { user, loading } = useUser();
  const userId = user?.id;

  const {
    selectedDiets,
    setSelectedDiets,
    availableDiets,
    saveSelectedDiets,
    message,
    setMessage,
  } = useDiets(userId);

  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container
      header={
        <h1 style={{ color: 'green', fontWeight: 'bold' }}>Manage diets</h1>
      }
    >
      {message && (
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
      )}
      <Box margin="m">
        <Multiselect
          options={availableDiets}
          selectedOptions={selectedDiets}
          onChange={({ detail }) =>
            setSelectedDiets([...detail.selectedOptions])
          }
          placeholder="Select diets"
        />
      </Box>

      {/* Pulsanti distanziati */}
      <SpaceBetween direction="horizontal" size="s">
        <Button
          variant="primary"
          onClick={() => saveSelectedDiets('/dashboard')}
          disabled={selectedDiets.length === 0}
        >
          Save Diets
        </Button>

        <Button variant="link" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </SpaceBetween>
    </Container>
  );
}
