import { useHealthConditions } from '../health-conditions-form/hook/use-health-conditions';
import { UserHealthConditionsTable } from '../health-conditions-form/components/user-health-condition-table';
import { Button, Container, Box, Flashbar, SpaceBetween } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export function HealthSummary() {
  const { userHealthConditions, removeCondition, message, setMessage } = useHealthConditions();
  const navigate = useNavigate();

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
