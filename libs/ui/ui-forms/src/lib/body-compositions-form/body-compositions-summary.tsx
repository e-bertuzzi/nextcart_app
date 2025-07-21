import { useBodyCompositions } from './hook/use-body-compositions';
import { UserBodyCompositionsTable } from './components/body-composition-table';
import {
  Button,
  Container,
  Box,
  Flashbar,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export function BodyCompositionSummary() {
  const { compositions, removeComposition, message, setMessage } = useBodyCompositions();
  const navigate = useNavigate();

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
            />
          )}

          <Button variant="primary" onClick={() => navigate('/body-composition/edit')}>
            Add or Edit Record
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
