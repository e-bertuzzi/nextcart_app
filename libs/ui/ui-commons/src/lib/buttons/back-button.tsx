import { useNavigate } from 'react-router-dom';
import { Button } from '@cloudscape-design/components';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} iconName="angle-left">
      Indietro
    </Button>
  );
};
