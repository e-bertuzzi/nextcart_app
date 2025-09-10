import { useState } from 'react';
import {
  Container,
  Box,
  Button,
  Flashbar,
  Spinner,
  Modal,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useDiets } from '../hook/use-diets';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserDietsTable } from '../components/user-diet-table';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function UiDietPage() {
  const { user, loading } = useUser();
  const userId = user?.id;

  const { selectedDiets, removeDiet, message, setMessage } = useDiets(userId);
  const navigate = useNavigate();

  // Stato per la modale di conferma
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDietId, setSelectedDietId] = useState<string | null>(null);

  // Normalizziamo le diete
  const normalizedDiets = selectedDiets.map((diet) => ({
    label: diet.label ?? '',
    value: diet.value ?? '',
  }));

  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleRemoveClick = (dietId: string) => {
    setSelectedDietId(dietId);
    setConfirmOpen(true);
  };

  const confirmRemove = () => {
    if (selectedDietId) {
      removeDiet(selectedDietId);
      setConfirmOpen(false);
      setSelectedDietId(null);
    }
  };

  return (
    <Container
      header={
        <h1 style={{ color: 'green', fontWeight: 'bold' }}>Diets summary</h1>
      }
    >
      <Box margin="m">
        <UserDietsTable diets={normalizedDiets} onRemove={handleRemoveClick} />
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

      <Button variant="primary" onClick={() => navigate('/dashboard/profile/diet/edit')}>
        Change diets
      </Button>

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
        Are you sure you want to remove this diet?
      </Modal>
    </Container>
  );
}
