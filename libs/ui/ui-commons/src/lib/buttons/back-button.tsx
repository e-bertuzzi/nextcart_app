import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@cloudscape-design/components';
import { useEffect, useRef } from 'react';

export const UiBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasPreviousPage = useRef(false);

  // Salva se esiste una pagina precedente
  useEffect(() => {
    if (window.history.length > 2) {
      hasPreviousPage.current = true;
    }
  }, []);

  const handleBack = () => {
    if (hasPreviousPage.current) {
      navigate(-1);
    } else {
      navigate('/dashboard'); // Cambia con la tua route di fallback
    }
  };

  return (
    <Button onClick={handleBack} iconName="angle-left">
      Back
    </Button>
  );
};
