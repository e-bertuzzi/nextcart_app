import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { useLogin } from '@nextcart/ui-auth';
import SuccessModal from '../components/success-modal';
import ErrorModal from '../components/error-modal';

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
    if (success) setSuccessModalVisible(true);
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
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 6, // margine verticale
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400, p: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome 👋
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
            Login to your account
          </Typography>

          <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="success" fullWidth onClick={onLoginClick}>
              Login
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{ color: '#10b981', fontWeight: 600, textDecoration: 'underline' }}
            >
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>

      <ErrorModal visible={errorModalVisible} message={errorMessage} onDismiss={closeErrorModal} />
      <SuccessModal visible={successModalVisible} onDismiss={() => setSuccessModalVisible(false)} />
    </Box>
  );
}
