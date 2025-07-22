import { useBodyCompositions } from './hook/use-body-compositions';
import { UserBodyCompositionsTable } from './components/body-composition-table';
import {
  Button,
  Container,
  Box,
  Flashbar,
  SpaceBetween,
  Spinner,
} from '@cloudscape-design/components';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/ui-auth';

export function BodyCompositionSummary() {
  const { user, loading } = useUser();
  const userId = user?.id ?? 0; // o gestisci undefined in altro modo

  const { compositions, removeComposition, message, setMessage } =
    useBodyCompositions(userId);

  const navigate = useNavigate();

  const handleEdit = (record: any) => {
    // Naviga alla pagina di modifica passando i dati da modificare, per esempio con state o query params
    navigate('/body-composition/edit', { state: { record } });
  };

  if (loading) return <Spinner />; // oppure <div>Loading...</div>

  if (!user) {
    return <Navigate to="/login" />;
  }  

  return (
    <Box margin="l">
      <Container
        header={
          <h1 style={{ color: 'green', fontWeight: 'bold' }}>
            Body Composition Summary
          </h1>
        }
      >
        <FormLayout message={message} setMessage={setMessage}>
          {compositions.length === 0 ? (
            <p>No body composition records available.</p>
          ) : (
            <UserBodyCompositionsTable
              compositions={compositions}
              onRemove={removeComposition}
              onEdit={handleEdit}
            />
          )}

          <Button
            variant="primary"
            onClick={() => navigate('/body-composition/edit')}
          >
            Add new body compositon
          </Button>
        </FormLayout>
      </Container>
    </Box>
  );
}

function FormLayout({ children, message, setMessage }: any) {
  return (
    <SpaceBetween size="l">
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
      {children}
    </SpaceBetween>
  );
}
