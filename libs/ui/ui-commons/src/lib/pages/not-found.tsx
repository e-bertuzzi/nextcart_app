import { useNavigate } from 'react-router-dom';
import { Button } from '@cloudscape-design/components';

export function UiNotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/homepage');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button variant="primary" onClick={handleGoHome} className="mt-4">
        Go to Homepage
      </Button>
    </div>
  );
}
