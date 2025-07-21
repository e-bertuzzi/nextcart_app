import { useEffect, useState } from 'react';
import {
  getUserBodyCompositions,
  createOrUpdateBodyComposition,
  deleteBodyCompositionByDate,
} from '../service/body-compositions-service'; // aggiorna il path se necessario
import { useNavigate } from 'react-router-dom';

export function useBodyCompositions(userId: number | undefined) {
  const [compositions, setCompositions] = useState<any[]>([]);
  const [message, setMessage] = useState<any>(null);

  const navigate = useNavigate();

  const fetchCompositions = async () => {
    try {
      const data = await getUserBodyCompositions(userId);
      setCompositions(data);
    } catch {
      setMessage({ type: 'error', content: 'Failed to load body composition records.' });
    }
  };

  const saveComposition = async (dto: { date: string | Date; weight?: number; height?: number }) => {
    try {
      await createOrUpdateBodyComposition(userId, dto);
      setMessage({
        type: 'success',
        content: 'Body composition saved! Redirecting in 2 seconds...',
      });
      fetchCompositions();

      setTimeout(() => {
        navigate('/body-composition');
      }, 2000);
    } catch {
      setMessage({ type: 'error', content: 'Error saving body composition.' });
    }
  };

  const removeComposition = async (date: string) => {
    try {
      await deleteBodyCompositionByDate(userId, date);
      setMessage({ type: 'success', content: 'Body composition removed.' });
      fetchCompositions();
    } catch {
      setMessage({ type: 'error', content: 'Failed to remove body composition.' });
    }
  };

  useEffect(() => {
    fetchCompositions();
  }, []);

  return {
    compositions,
    saveComposition,
    removeComposition,
    fetchCompositions,
    message,
    setMessage,
  };
}
