import { Form, FormField, Input, Button, SpaceBetween } from '@cloudscape-design/components';
import { Link } from 'react-router-dom';
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
    successModalVisible,
    errorMessage,
    handleLogin,
    closeErrorModal,
    closeSuccessModal
  } = useLogin();

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

          <Button
            variant="primary"
            onClick={handleLogin}
            className="!bg-emerald-600 hover:!bg-emerald-700 !text-white rounded-full shadow"
          >
            Login
          </Button>

          <div className="mt-2 text-center text-sm">
            <span>Non hai un account? </span>
            <Link
              to="/register"
              className="text-emerald-700 font-semibold underline hover:text-emerald-800"
            >
              Registrati
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
        onDismiss={closeSuccessModal}
      />
    </>
  );
}