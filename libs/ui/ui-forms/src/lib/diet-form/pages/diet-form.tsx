import {
  Multiselect,
  Button,
  Container,
  Box,
  Flashbar,
  Spinner,
} from '@cloudscape-design/components';
import { useDiets } from '../hook/use-diets';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { Navigate } from 'react-router-dom';

export function UiDietEdit() {
  const { user, loading } = useUser();
  const userId = user?.id; // userId può essere undefined se user è null

  const {
    selectedDiets,
    setSelectedDiets,
    availableDiets,
    saveSelectedDiets,
    message,
    setMessage,
  } = useDiets(userId);

  if (loading) return <Spinner />; // oppure <div>Loading...</div>

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
      <Button
        variant="primary"
        onClick={saveSelectedDiets}
        disabled={selectedDiets.length === 0}
      >
        Save Diets
      </Button>
    </Container>
  );
}
