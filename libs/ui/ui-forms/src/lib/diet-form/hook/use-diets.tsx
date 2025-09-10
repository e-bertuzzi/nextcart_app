import { useEffect, useState } from 'react';
import {
  getUserDiets,
  getAllDiets,
  saveUserDiets,
  removeUserDiet,
} from '../service/diets-service';
import { SelectProps } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export function useDiets(userId: number | undefined) {
  const [selectedDiets, setSelectedDiets] = useState<SelectProps.Option[]>([]);
  const [availableDiets, setAvailableDiets] = useState<SelectProps.Option[]>([]);
  const [message, setMessage] = useState<any>(null);

  const navigate = useNavigate();

  const fetchAvailableDiets = async () => {
    try {
      const diets = await getAllDiets();
      setAvailableDiets(diets);
    } catch {
      setMessage({ type: 'error', content: 'Failed to load diets.' });
    }
  };

  const fetchUserDiets = async () => {
    try {
      const data = await getUserDiets(userId);
      setSelectedDiets(data);
    } catch {
      setMessage({ type: 'error', content: 'Failed to load user diets.' });
    }
  };

  const saveSelectedDiets = async (redirectPath: string) => {
    try {
      const dietIds = selectedDiets.map(d => d.value as string);
      await saveUserDiets(userId, dietIds);
      setMessage({ type: 'success', content: 'Diets saved successfully! You will be transferred in 2 seconds' });
      fetchUserDiets();
      setTimeout(() => navigate(redirectPath), 2000);
    } catch {
      setMessage({ type: 'error', content: 'Error saving diets.' });
    }
  };

  const removeDiet = async (dietId: string) => {
    try {
      await removeUserDiet(userId, dietId);
      setMessage({ type: 'success', content: 'Diet removed.' });
      fetchUserDiets();
    } catch {
      setMessage({ type: 'error', content: 'Failed to remove diet.' });
    }
  };

  useEffect(() => {
    fetchAvailableDiets();
    fetchUserDiets();
  }, []);

  return {
    selectedDiets,
    setSelectedDiets,
    availableDiets,
    saveSelectedDiets,
    removeDiet,
    message,
    setMessage,
  };
}
