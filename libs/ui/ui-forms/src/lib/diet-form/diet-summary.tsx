import { Container, Box, Button, Flashbar } from '@cloudscape-design/components';
import { useDiets } from './hook/use-diets';
import { useNavigate } from 'react-router-dom';
import { UserDietsTable } from './components/user-diet-table';

export function DietSummary() {
  const { selectedDiets, removeDiet, message, setMessage } = useDiets();
  const navigate = useNavigate();

  const normalizedDiets = selectedDiets.map(diet => ({
    label: diet.label ?? 'N/A',
    value: Number(diet.value),
  }));

  return (
    <Container header={
    <h1 style={{ color: 'green', fontWeight: 'bold' }}>
      Diets summary
    </h1>}>
      <Box margin="m">
        <UserDietsTable diets={normalizedDiets} onRemove={removeDiet} />
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

      <Button variant="primary" onClick={() => navigate('/diet/edit')}>
        Change diets
      </Button>
    </Container>
  );
}
