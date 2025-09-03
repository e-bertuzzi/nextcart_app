import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (): Promise<boolean> => {
    try {
      const response = await api.post(
        '/auth/login',
        { email, password },
        { withCredentials: true }
      );

      const { accessToken } = response.data;
      setSuccessModalVisible(true);
      console.log('Success modal visible set to true');

      // Delay login to let modal appear
      setTimeout(() => {
        login(accessToken);
      }, 2000);

      return true;
    } catch (error) {
      setErrorMessage('Connection error or wrong credentials.');
      setErrorModalVisible(true);
      return false;
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorModalVisible,
    successModalVisible,
    errorMessage,
    handleLogin,
    closeErrorModal: () => setErrorModalVisible(false),
    closeSuccessModal: () => setSuccessModalVisible(false),
  };
}
