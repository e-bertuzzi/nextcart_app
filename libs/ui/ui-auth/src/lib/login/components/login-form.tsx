import { useEffect, useState } from 'react';
import { Form, FormField, Input, Button, SpaceBetween } from '@cloudscape-design/components';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../hooks/use-login';
import SuccessModal from './modals/success-modal';
import ErrorModal from './modals/error-modal';

export default function LoginForm() {
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
        navigate('/homepage');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successModalVisible, navigate]);

  return (
    <>
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
