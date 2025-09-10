import { useState } from 'react';
import { usePhysicalActivity } from '../hook/use-physical-activity';
import { UserPhysicalActivitiesTable } from '../components/physical-activity-table';
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

export function UiPhysicalActivityPage() {
  const { user, loading } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const {
    userActivities,
    removeActivity,
    message,
    setMessage,
    loadingActivities,
  } = usePhysicalActivity(userId);

  // Stato per la modale di conferma
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    null
  );

  if (loading || loadingActivities) return <Spinner />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleRemoveClick = (activityId: number) => {
    setSelectedActivityId(activityId);
    setConfirmOpen(true);
  };

  const confirmRemove = () => {
    if (selectedActivityId) {
      removeActivity(selectedActivityId);
      setConfirmOpen(false);
      setSelectedActivityId(null);
    }
  };

  return (
    <Box margin="l">
      <Container
        header={
          <h1 style={{ color: 'green', fontWeight: 'bold' }}>
            Physical Activity Summary
          </h1>
        }
      >
        <FormLayout message={message} setMessage={setMessage}>
          {userActivities.length === 0 ? (
            <p>No physical activities logged.</p>
          ) : (
            <UserPhysicalActivitiesTable
              activities={userActivities}
              onRemove={handleRemoveClick} // ✅ ora apre la modale
            />
          )}

          <Button
            variant="primary"
            onClick={() => navigate('/dashboard/lifestyle/activity/edit')}
          >
            Add new activity
          </Button>
        </FormLayout>

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
          Are you sure you want to remove this activity?
        </Modal>
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
