import { Container } from '@cloudscape-design/components';
import LoginForm from './login/components/login-form';
import RegisterForm from './registration/registration-form';

export function UiLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-emerald-50 to-green-100 px-4">
      <Container
        className="w-full max-w-xl"
        header={<span className="text-2xl text-emerald-700 font-bold">Login</span>}
      >
        <LoginForm />
      </Container>
    </div>
  );
}

export function UiRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-emerald-50 to-green-100 px-4">
      <Container className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">
        <RegisterForm />
      </Container>
    </div>
  );
}

