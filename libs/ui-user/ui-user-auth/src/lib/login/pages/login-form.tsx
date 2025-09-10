// pages/UiLogin.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useLogin } from "@nextcart/ui-auth";
import { LoginForm } from "../components/login-form";
import { AuthCard } from "../components/auth-card";
import SuccessModal from "../components/success-modal";
import ErrorModal from "../components/error-modal";

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
        navigate("/dashboard");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successModalVisible, navigate]);

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", py: 6 }}>
      <AuthCard
        title="Welcome 👋"
        subtitle="Login to your account"
        footer={
          <>
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "#10b981", fontWeight: 600, textDecoration: "underline" }}>
              Register
            </Link>
          </>
        }
      >
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={onLoginClick}
        />
      </AuthCard>

      <ErrorModal visible={errorModalVisible} message={errorMessage} onDismiss={closeErrorModal} />
      <SuccessModal visible={successModalVisible} onDismiss={() => setSuccessModalVisible(false)} />
    </Box>
  );
}
