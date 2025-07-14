import { Box, Button, Container, Header, SpaceBetween, Flashbar } from '@cloudscape-design/components';
import { EditUserFieldsGroup, SharedFormData } from './components/profile-fields-group';
import { useEditProfile } from './hooks/edit-profile';

export function UiProfile() {
  const { formData, loading, message, onChange, handleSubmit, setMessage } = useEditProfile();

  return (
    <Box padding="l" className="bg-gradient-to-b from-white via-emerald-50 to-green-100 min-h-screen">
      <Container
        header={
          <Header variant="h2" className="text-emerald-700 font-bold text-xl">
            Edit personal data
          </Header>
        }
      >
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

          <EditUserFieldsGroup formData={formData} onChange={onChange} disabled={loading} />

          <Button onClick={handleSubmit} loading={loading} variant="primary">
            Save changes
          </Button>
        </SpaceBetween>
      </Container>
    </Box>
  );
}
