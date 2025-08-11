import { useNavigate } from 'react-router-dom';
import { Button } from '@cloudscape-design/components';

export function UiUnauthorized() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/homepage');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#dc3545' }}>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Button variant="primary" onClick={handleGoHome} className="mt-4">
        Go to Homepage
      </Button>
    </div>
  );
}