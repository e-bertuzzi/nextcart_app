import { Container, Form, SpaceBetween, Button } from '@cloudscape-design/components';
import { useRegisterForm } from './hooks/use-register'; // il tuo hook personalizzato

import { NameField } from './components/fields/name-field';
import { SurnameField } from './components/fields/surname-field';
import { EmailField } from './components/fields/email-field';
import { PasswordField } from './components/fields/password-field';
import { DateOfBirthField } from './components/fields/date-birth-field';
import { PlaceOfBirthField } from './components/fields/place-of-birth-field';
import { AddressField } from './components/fields/address-field';
import { GenderField } from './components/fields/gender-field';

import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from './components/modals/error-modal';
import SuccessModal from './components/modals/success-modal';

export default function RegisterForm() {
  const navigate = useNavigate()

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
        <Container header={<span className="text-2xl font-bold text-emerald-700">Registrati</span>}>
          <Form>
            <SpaceBetween size="m">
              <NameField value={formData.name} onChange={(v) => handleChange('name', v)} />
              <SurnameField value={formData.surname} onChange={(v) => handleChange('surname', v)} />
              <EmailField value={formData.email} onChange={(v) => handleChange('email', v)} />
              <PasswordField value={formData.password} onChange={(v) => handleChange('password', v)} />
              <PasswordField value={formData.confirmPassword} onChange={(v) => handleChange('confirmPassword', v)} />
              <DateOfBirthField value={formData.dateOfBirth} onChange={(v) => handleChange('dateOfBirth', v)} />
              <PlaceOfBirthField value={formData.placeOfBirth} onChange={(v) => handleChange('placeOfBirth', v)} />
              <AddressField value={formData.address} onChange={(v) => handleChange('address', v)} />
              <GenderField value={formData.gender} onChange={(v) => handleChange('gender', v)} />

              <Button
                variant="primary"
                onClick={handleRegister}
                className="!bg-emerald-600 !hover:bg-emerald-700 !text-white rounded-full shadow"
              >
                Registrati
              </Button>

              <div className="text-center mt-2 text-sm">
                <span>Hai già un account? </span>
                <Link
                  to="/login"
                  className="text-emerald-700 underline font-semibold hover:text-emerald-800"
                >
                  Accedi
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
            message="Registrazione avvenuta con successo! Verrai reindirizzato alla pagina di login..."
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
