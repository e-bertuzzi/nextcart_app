import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

export default function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password }, {
        withCredentials: true, 
      });

      const { accessToken } = response.data;
      login(accessToken);
      setSuccessModalVisible(true);

      setTimeout(() => {
        setSuccessModalVisible(false);
        navigate('/homepage');
      }, 2000);
    } catch (error: any) {
      console.error('Login error:', error);
      const message = 'Connection error or wrong credentials.';
      setErrorMessage(message);
      setErrorModalVisible(true);
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
