import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Gender } from '@nextcart/enum';

export function useRegisterForm() {
  const [formData, setFormData] = useState({
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

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.dateOfBirth ||
      !formData.gender
    ) {
      setErrorMessage('Please fill in all required fields marked with *');
      setErrorModalVisible(true);
      return false;
    }
    if (!isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setErrorModalVisible(true);
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('The passwords do not match');
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
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password,
          dateOfBirth: new Date(formData.dateOfBirth),
          placeOfBirth: formData.placeOfBirth,
          gender: formData.gender,
          address: formData.address,
        }),
      });

      if (!response.ok) throw new Error('Registration failed');

      await response.json();

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
    errorModalVisible,
    errorMessage,
    successModalVisible,
    setErrorModalVisible,
    setSuccessModalVisible,
    handleChange,
    handleRegister,
  };
}
