import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Gender } from '@nextcart/enum';

export interface RegisterFormData {
  name: string;
  surname?: string;
  dateOfBirth: string;
  placeOfBirth?: string;
  address?: string;
  gender: Gender;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: Gender.isMale,
    address: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (key: keyof RegisterFormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined })); // reset errore quando utente scrive
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

    if (!formData.name) newErrors.name = 'Required';
    if (!formData.surname) newErrors.surname = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.password) newErrors.password = 'Required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Required';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Required';
    if (!formData.gender) newErrors.gender = 'Required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Please correct the highlighted fields');
      setErrorModalVisible(true);
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          dateOfBirth: new Date(formData.dateOfBirth),
        }),
      });

      if (!response.ok) throw new Error('Registration failed');

      setFormData({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        placeOfBirth: '',
        gender: Gender.isMale,
        address: '',
      });

      setSuccessModalVisible(true);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setErrorMessage('Error during registration');
      setErrorModalVisible(true);
    }
  };

  return {
    formData,
    errors,
    errorModalVisible,
    errorMessage,
    successModalVisible,
    setErrorModalVisible,
    setSuccessModalVisible,
    handleChange,
    handleRegister,
  };
}
