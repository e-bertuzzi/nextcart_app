import { Container, Form, SpaceBetween, Button } from '@cloudscape-design/components';
import { useRegisterForm } from './hooks/use-register';
import { RegisterFieldsGroup } from './components/fields-group/register-fields-group'; // <- importa il gruppo riutilizzabile

import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from './components/modals/error-modal';
import SuccessModal from './components/modals/success-modal';

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    formData,
    errorModalVisible,
    errorMessage,
    successModalVisible,
    setErrorModalVisible,
    setSuccessModalVisible,
    handleChange,
    handleRegister,
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-emerald-50 to-green-100 px-4">
      <div className="w-full max-w-lg">
        <Container header={<span className="text-2xl font-bold text-emerald-700">Registration</span>}>
          <Form>
            <SpaceBetween size="m">
              <RegisterFieldsGroup
                formData={formData}
                onChange={handleChange}
                disabled={false}
              />

              <div className="mx-auto w-fit rounded-full shadow overflow-hidden">
                <Button variant="primary" onClick={handleRegister}>
                  Registration
                </Button>
              </div>

              <div className="text-center mt-2 text-sm">
                <span>Already have an account? </span>
                <Link
                  to="/login"
                  className="text-emerald-700 underline font-semibold hover:text-emerald-800"
                >
                  Login
                </Link>
              </div>
            </SpaceBetween>

          </Form>
        </Container>

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
      </div>
    </div>
  );
}
