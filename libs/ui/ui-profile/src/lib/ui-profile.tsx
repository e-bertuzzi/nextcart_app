import {
  Box,
  Button,
  Container,
  Header,
  SpaceBetween,
  Flashbar,
  ColumnLayout,
} from '@cloudscape-design/components';
import { EditUserFieldsGroup } from './components/profile-fields-group';
import { useEditProfile } from './hooks/edit-profile';

export function UiProfile() {
  const { formData, loading, message, onChange, handleSubmit, setMessage } = useEditProfile();

  return (
    <Box padding={{ vertical: 'xl', horizontal: 'l' }}>
      <ColumnLayout columns={1}>
        <Container
          header={
            <Header variant="h2">
              <Box color="text-status-success" fontWeight="bold">
                Edit personal data
              </Box>
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

            <EditUserFieldsGroup
              formData={formData}
              onChange={onChange}
              disabled={loading}
            />

            <Box textAlign="center">
              <Button onClick={handleSubmit} loading={loading} variant="primary">
                Save changes
              </Button>
            </Box>
          </SpaceBetween>
        </Container>
      </ColumnLayout>
    </Box>
  );
}
