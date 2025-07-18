import { useHealthConditions } from '../health-conditions-form/hook/use-health-conditions';
import { UserHealthConditionsTable } from '../health-conditions-form/components/user-health-condition-table';
import { Button, Container, Box } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export function HealthSummary() {
  const { userHealthConditions, removeCondition } = useHealthConditions();
  const navigate = useNavigate();

  return (
    <Container header={<h1>Health conditions summary</h1>}>
      <Box margin="m">
        {userHealthConditions.length === 0 ? (
          <p>No conditions selected.</p>
        ) : (
          <UserHealthConditionsTable
            conditions={userHealthConditions}
            onRemove={removeCondition}
          />
        )}
      </Box>
      <Button variant="primary" onClick={() => navigate('/health/edit')}>
        Change conditions
      </Button>
    </Container>
  );
}
