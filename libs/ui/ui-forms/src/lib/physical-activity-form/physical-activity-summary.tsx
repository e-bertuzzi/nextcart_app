import { usePhysicalActivity } from './hook/use-physical-activity';
import { UserPhysicalActivitiesTable } from './components/physical-activity-table';
import { Button, Container, Box, Flashbar, SpaceBetween, Spinner } from '@cloudscape-design/components';
import { Navigate, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function PhysicalActivitySummary() {
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

  if (loading || loadingActivities) return <Spinner />;

  if (!user) {
    return <Navigate to="/login" />;
  }

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
              onRemove={removeActivity}
            />
          )}

          <Button variant="primary" onClick={() => navigate('/physical-activity/edit')}>
            Add new activity
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
