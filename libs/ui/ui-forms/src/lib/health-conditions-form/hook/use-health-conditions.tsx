import { useEffect, useState } from 'react';
import {
  getUserHealthConditions,
  filterHealthConditions,
  saveUserHealthConditions,
  removeUserHealthCondition,
} from '../service/health-conditions-service';
import { SelectProps } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export function useHealthConditions(userId: number | undefined) {
  const [selectedAgeCondition, setSelectedAgeCondition] =
    useState<SelectProps.Option | null>(null);
  const [selectedPathologies, setSelectedPathologies] = useState<
    SelectProps.Option[]
  >([]);
  const [selectedPhysStates, setSelectedPhysStates] = useState<
    SelectProps.Option[]
  >([]);

  const [ageConditions, setAgeConditions] = useState<SelectProps.Option[]>([]);
  const [pathologies, setPathologies] = useState<SelectProps.Option[]>([]);
  const [physStates, setPhysStates] = useState<SelectProps.Option[]>([]);
  const [userHealthConditions, setUserHealthConditions] = useState<
    SelectProps.Option[]
  >([]);
  const [message, setMessage] = useState<any>(null);

  // Funzione per ottenere tutti gli ID selezionati correnti, usata per filtro
  const getSelectedConditionIds = (): string[] => {
    return [
      selectedAgeCondition?.value,
      ...selectedPathologies.map((p) => p.value),
      ...selectedPhysStates.map((p) => p.value),
    ].filter(Boolean) as string[];
  };

  // Carica condizioni salvate dell’utente
  const fetchUserConditions = async () => {
    try {
      const data = await getUserHealthConditions(userId);
      setUserHealthConditions(data);
    } catch {
      setMessage({ type: 'error', content: 'Failed to load user conditions.' });
    }
  };

  // Carica tutte le età (categoria 'age') — senza filtro perché è il primo livello
  useEffect(() => {
    filterHealthConditions([], 'age')
      .then(setAgeConditions)
      .catch(() =>
        setMessage({ type: 'error', content: 'Failed to load age conditions.' })
      );
  }, []);

  // Quando selezioni età, carica patologie filtrate per tutte le condizioni selezionate (solo età ora)
  useEffect(() => {
    if (!selectedAgeCondition) {
      setPathologies([]);
      setSelectedPathologies([]);
      return;
    }

    // Solo età come filtro al momento
    const selectedIds = [String(selectedAgeCondition.value)];

    filterHealthConditions(selectedIds, 'pathology')
      .then(setPathologies)
      .catch(() =>
        setMessage({ type: 'error', content: 'Failed to load pathologies.' })
      );
  }, [selectedAgeCondition]);

  // Quando selezioni patologie, carica stati fisiologici filtrati per tutte le condizioni selezionate (età + patologie)
  useEffect(() => {
    if (!selectedAgeCondition || selectedPathologies.length === 0) {
      setPhysStates([]);
      setSelectedPhysStates([]);
      return;
    }

    const selectedIds = [
      String(selectedAgeCondition.value),
      ...selectedPathologies.map((p) => String(p.value)),
    ];

    filterHealthConditions(selectedIds, 'physiological_state')
      .then(setPhysStates)
      .catch(() =>
        setMessage({
          type: 'error',
          content: 'Failed to load physiological states.',
        })
      );
  }, [selectedAgeCondition, selectedPathologies]);

  const navigate = useNavigate();

  const saveSelectedConditions = async (redirectPath: string) => {
    try {
      const allIds = getSelectedConditionIds().filter((id) => id !== '0');

      await saveUserHealthConditions(userId, allIds);
      setMessage({
        type: 'success',
        content:
          'Health conditions saved successfully! You will be transferred in 2 seconds',
      });
      fetchUserConditions();

      setTimeout(() => {
        navigate(redirectPath);
      }, 2000);
    } catch {
      setMessage({ type: 'error', content: 'Error saving health conditions.' });
    }
  };

  // Rimuove una condizione selezionata dall’utente
  const removeCondition = async (conditionId: string) => {
    try {
      await removeUserHealthCondition(userId, conditionId);
      setMessage({ type: 'success', content: 'Condition removed.' });
      fetchUserConditions();
    } catch {
      setMessage({ type: 'error', content: 'Failed to remove condition.' });
    }
  };

  useEffect(() => {
    fetchUserConditions();
  }, []);

  return {
    selectedAgeCondition,
    setSelectedAgeCondition,
    selectedPathologies,
    setSelectedPathologies,
    selectedPhysStates,
    setSelectedPhysStates,
    ageConditions,
    pathologies,
    physStates,
    userHealthConditions,
    fetchUserConditions,
    saveSelectedConditions,
    removeCondition,
    message,
    setMessage,
  };
}
