import { useState } from 'react';
import { useHealthConditions } from '../hook/use-health-conditions';
import { UserHealthConditionsTable } from '../components/user-health-condition-table';
import {
  Button,
  Container,
  Box,
  Flashbar,
  SpaceBetween,
  Spinner,
  Modal,
} from '@cloudscape-design/components';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function UiHealthPage() {
  const { user, loading } = useUser();
  const userId = user?.id;

  const { userHealthConditions, removeCondition, message, setMessage } =
    useHealthConditions(userId);
  const navigate = useNavigate();

  // stato per la modale di conferma
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(
    null
  );

  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleRemoveClick = (id: string) => {
    setSelectedConditionId(id);
    setConfirmOpen(true);
  };

  const confirmRemove = () => {
    if (selectedConditionId) {
      removeCondition(selectedConditionId);
      setConfirmOpen(false);
      setSelectedConditionId(null);
    }
  };

  return (
    <Box margin="l">
      <Container
        header={
          <h1 style={{ color: 'green', fontWeight: 'bold' }}>
            Health conditions summary
          </h1>
        }
      >
        <FormLayout message={message} setMessage={setMessage}>
          {userHealthConditions.length === 0 ? (
            <p>No conditions selected.</p>
          ) : (
            <UserHealthConditionsTable
              conditions={userHealthConditions}
              onRemove={handleRemoveClick} // ⬅️ ora non elimina subito
            />
          )}

          <Button variant="primary" onClick={() => navigate('/health/edit')}>
            Change conditions
          </Button>
        </FormLayout>
      </Container>

      {/* Modale di conferma */}
      <Modal
        visible={confirmOpen}
        header="Confirm removal"
        onDismiss={() => setConfirmOpen(false)}
        closeAriaLabel="Close modal"
        footer={
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={confirmRemove}>
              Confirm
            </Button>
          </SpaceBetween>
        }
      >
        Are you sure you want to remove this health condition?
      </Modal>
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
