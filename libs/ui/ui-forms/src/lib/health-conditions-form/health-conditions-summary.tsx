import { useHealthConditions } from '../health-conditions-form/hook/use-health-conditions';
import { UserHealthConditionsTable } from '../health-conditions-form/components/user-health-condition-table';
import { Button, Container, Box, Flashbar, SpaceBetween, Spinner } from '@cloudscape-design/components';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '@nextcart/ui-auth'

export function HealthSummary() {
  const { user, loading } = useUser();
  const userId = user?.id;  // userId può essere undefined se user è null
  
  const { userHealthConditions, removeCondition, message, setMessage } = useHealthConditions(userId);
  const navigate = useNavigate();

  if (loading) return <Spinner />; // oppure <div>Loading...</div>
  
    if (!user) {
      return <Navigate to="/login" />;
    }

  return (
    <Box margin="l">
      <Container header={
        <h1 style={{ color: 'green', fontWeight: 'bold' }}>
          Health conditions summary
        </h1>
      }>
        <FormLayout message={message} setMessage={setMessage}>
          {userHealthConditions.length === 0 ? (
            <p>No conditions selected.</p>
          ) : (
            <UserHealthConditionsTable
              conditions={userHealthConditions}
              onRemove={removeCondition}
            />
          )}

          <Button variant="primary" onClick={() => navigate('/health/edit')}>
            Change conditions
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
