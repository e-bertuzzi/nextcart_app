import { Box, Stack, Button, Typography, Paper } from '@mui/material';
import { useRegisterForm } from '@nextcart/ui-auth';
import { RegisterFieldsGroup } from '../components/fields-group/register-field-group';
import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from '../components/modals/error-modal';
import SuccessModal from '../components/modals/success-modal';

export function UiRegister() {
  const navigate = useNavigate();

  const {
    formData,
    errors,
    errorModalVisible,
    errorMessage,
    successModalVisible,
    setErrorModalVisible,
    setSuccessModalVisible,
    handleChange,
    handleRegister,
  } = useRegisterForm();

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 6, // margine verticale per “sollevare” il card
        }}
      >
        <Paper
          elevation={3}
          sx={{ maxWidth: 500, width: '100%', p: 4, borderRadius: 3 }}
        >
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Fields marked with <span style={{ color: 'red' }}>*</span> are required.
            </Typography>

            <RegisterFieldsGroup
              formData={formData}
              errors={errors}
              onChange={handleChange}
              disabled={false}
            />
              <Button
                variant="contained"
                color="success"
                onClick={handleRegister}
              >
                Registration
              </Button>

            <Typography variant="body2" textAlign="center">
              Already have an account?{' '}
              <Link
                to="/login"
                style={{ color: '#22c55e', fontWeight: 600, textDecoration: 'underline' }}
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>

      <ErrorModal
        visible={errorModalVisible}
        message={errorMessage}
        onDismiss={() => setErrorModalVisible(false)}
      />

      <SuccessModal
        visible={successModalVisible}
        message="Registration successful! You will be redirected to the login page..."
        onDismiss={() => setSuccessModalVisible(false)}
        onButtonClick={() => {
          setSuccessModalVisible(false);
          navigate('/login');
        }}
      />
    </>
  );
}
