import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context';

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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login fallito');

      const data = await response.json();
      login(data.accessToken);
      setSuccessModalVisible(true);

      setTimeout(() => {
        setSuccessModalVisible(false);
        navigate('/homepage');
      }, 2000);
    } catch (error) {
      setErrorMessage('Credenziali errate o errore di connessione.');
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
    closeSuccessModal: () => setSuccessModalVisible(false)
  };
}