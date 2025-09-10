import { useEffect, useState } from 'react';
import {
  Form,
  FormField,
  Input,
  Button,
  SpaceBetween,
  Container,
} from '@cloudscape-design/components';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/use-login';
import SuccessModal from '../components/modals/success-modal';
import ErrorModal from '../components/modals/error-modal';

export function UiLogin() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errorModalVisible,
    errorMessage,
    handleLogin,
    closeErrorModal,
  } = useLogin();

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const navigate = useNavigate();

  const onLoginClick = async () => {
    const success = await handleLogin();
    if (success) {
      setSuccessModalVisible(true);
    }
  };

  useEffect(() => {
    if (successModalVisible) {
      const timer = setTimeout(() => {
        setSuccessModalVisible(false);
        navigate('/dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successModalVisible, navigate]);

  return (
    <>
      <Container>
        <div className="flex flex-col justify-center items-center min-h-[80vh] bg-gradient-to-b from-white via-emerald-50 to-green-100 px-4">
          <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 max-h-[90vh] overflow-auto">
            <Form>
              <SpaceBetween size="m">
                <FormField label="Email">
                  <Input
                    value={email}
                    onChange={({ detail }) => setEmail(detail.value)}
                    type="email"
                  />
                </FormField>

                <FormField label="Password">
                  <Input
                    value={password}
                    onChange={({ detail }) => setPassword(detail.value)}
                    type="password"
                  />
                </FormField>

                <div className="mx-auto rounded-full shadow overflow-hidden w-fit">
                  <Button
                    variant="primary"
                    onClick={onLoginClick}
                    data-testid="login-button"
                  >
                    Login
                  </Button>
                </div>

                <div className="mt-2 text-center text-sm">
                  <span>Don't have an account? </span>
                  <Link
                    to="/register"
                    className="text-emerald-700 font-semibold underline hover:text-emerald-800"
                  >
                    Registration
                  </Link>
                </div>
              </SpaceBetween>
            </Form>
          </div>
        </div>
      </Container>

      <ErrorModal
        visible={errorModalVisible}
        message={errorMessage}
        onDismiss={closeErrorModal}
      />

      <SuccessModal
        visible={successModalVisible}
        onDismiss={() => setSuccessModalVisible(false)}
      />
    </>
  );
}
