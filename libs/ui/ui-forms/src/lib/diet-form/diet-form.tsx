import { Multiselect, Button, Container, Box, Flashbar } from '@cloudscape-design/components';
import { useDiets } from './hook/use-diets';

export function DietForm() {
  const {
    selectedDiets,
    setSelectedDiets,
    availableDiets,
    saveSelectedDiets,
    message,
    setMessage,
  } = useDiets();

  return (
    <Container header={
    <h1 style={{ color: 'green', fontWeight: 'bold' }}>
      Manage diets
    </h1>}>
      {message && (
        <Flashbar
          items={[{
            type: message.type,
            content: message.content,
            dismissible: true,
            onDismiss: () => setMessage(null),
          }]}
        />
      )}
      <Box margin="m">
        <Multiselect
          options={availableDiets}
          selectedOptions={selectedDiets}
          onChange={({ detail }) => setSelectedDiets([...detail.selectedOptions])}
          placeholder="Select diets"
        />
      </Box>
      <Button variant="primary" onClick={saveSelectedDiets} disabled={selectedDiets.length === 0}>
        Save Diets
      </Button>
    </Container>
  );
}
