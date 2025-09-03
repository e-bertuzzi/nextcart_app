import { Box, Stack, Button, Typography, Paper, Alert } from '@mui/material';
import { useEditProfile } from '@nextcart/ui-profile';
import { EditUserFieldsGroup } from '../../components/profile-fields-group';

export function UiProfileForm() {
  const { formData, loading, message, onChange, handleSubmit, setMessage } =
    useEditProfile();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        maxHeight: '90%',
        overflowY: 'auto',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 500,
          width: '100%',
          p: 4,
          borderRadius: 3,
          maxHeight: '90vh',
          overflowY: 'auto', // scroll interno se necessario
        }}
      >
        <Stack spacing={3}>
          {/* Header */}
          <Box textAlign="center">
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Edit Personal Data
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Update your personal information below
            </Typography>
          </Box>

          {/* Flash message */}
          {message && (
            <Alert
              severity={message.type === 'error' ? 'error' : 'success'}
              onClose={() => setMessage(null)}
            >
              {message.content}
            </Alert>
          )}

          {/* Form in verticale */}
          <EditUserFieldsGroup
            formData={formData}
            onChange={onChange}
            disabled={loading}
          />

          {/* Submit button */}
          <Box textAlign="center">
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="success"
              size="large"
              disabled={loading}
              sx={{ borderRadius: '999px', px: 5 }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
