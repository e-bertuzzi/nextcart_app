import { useEffect, useState } from 'react';
import {
  getUserDiets,
  saveUserDiets,
  removeUserDiet,
} from '../service/diets-service';
import { SelectProps } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

import { api } from '@nextcart/http'
 
export function useDiets(userId = 1) {
  const [selectedDiets, setSelectedDiets] = useState<SelectProps.Option[]>([]);
  const [availableDiets, setAvailableDiets] = useState<SelectProps.Option[]>([]);
  const [message, setMessage] = useState<any>(null);

  const navigate = useNavigate();

  // Carica tutte le diete disponibili
  const fetchAllDiets = async () => {
    try {
      const res = await api.get('/diet');
      setAvailableDiets(res.data.map((d: any) => ({ label: d.description, value: d.dietId })));
    } catch {
      setMessage({ type: 'error', content: 'Failed to load diets.' });
    }
  };

  // Carica diete già selezionate dall'utente
  const fetchUserDiets = async () => {
    try {
      const data = await getUserDiets(userId);
      setSelectedDiets(data);
    } catch {
      setMessage({ type: 'error', content: 'Failed to load user diets.' });
    }
  };

  // Salva le diete selezionate per l'utente
  const saveSelectedDiets = async () => {
    try {
      const dietIds = selectedDiets.map(d => Number(d.value));
      await saveUserDiets(userId, dietIds);
      setMessage({ type: 'success', content: 'Diets saved successfully! Redirecting...' });
      fetchUserDiets();
      setTimeout(() => navigate('/diet'), 2000);
    } catch {
      setMessage({ type: 'error', content: 'Error saving diets.' });
    }
  };

  // Rimuove una dieta dall'utente
  const removeDiet = async (dietId: number) => {
    try {
      await removeUserDiet(userId, dietId);
      setMessage({ type: 'success', content: 'Diet removed.' });
      fetchUserDiets();
    } catch {
      setMessage({ type: 'error', content: 'Failed to remove diet.' });
    }
  };

  useEffect(() => {
    fetchAllDiets();
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
