import { useEffect, useState } from 'react';
import {
  getUserPhysicalActivities,
  saveUserPhysicalActivity,
  removeUserPhysicalActivity,
  getAllActivities,
} from '../service/physical-activity-service'; // <-- da creare
import { useNavigate } from 'react-router-dom';

export function usePhysicalActivity(userId?: number) {
  const [userActivities, setUserActivities] = useState<any[]>([]);
  const [allActivities, setAllActivities] = useState<any[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [message, setMessage] = useState<any>(null);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [specificActivity, setSpecificActivity] = useState<any | null>(null);


  const navigate = useNavigate();

  // Carica attività salvate dall’utente
  const fetchUserActivities = async () => {
    try {
      setLoadingActivities(true); // 👈 Inizio del caricamento
      const data = await getUserPhysicalActivities(userId);
      setUserActivities(data);
    } catch {
      setMessage({
        type: 'error',
        content: 'Errore nel recupero delle attività utente.',
      });
    } finally {
      setLoadingActivities(false); // 👈 Fine del caricamento
    }
  };

  // Carica tutte le attività (dal catalogo "Activity")
  const fetchAllActivities = async () => {
    try {
      const data = await getAllActivities();
      console.log('All activities raw data:', data);

      // Mappiamo i dati con i nomi coerenti per il frontend
      setAllActivities(
        data.map((a: any) => ({
          id: a.activityId,
          name: a.SpecificActivity,
          type: a.ActivityType,
        }))
      );
    } catch {
      setMessage({
        type: 'error',
        content: 'Errore nel recupero delle attività disponibili.',
      });
    }
  };


  // Salva nuova attività fisica
  const saveActivity = async () => {
    try {
      if (!selectedActivity || !durationMinutes || !date) {
        setMessage({ type: 'error', content: 'Completa tutti i campi.' });
        return;
      }

      await saveUserPhysicalActivity({
        activityId: Number(specificActivity?.value),
        specificActivity: specificActivity?.label,
        durationMinutes,
        date,
        consumerId: userId
      }, userId);

      setMessage({
        type: 'success',
        content: 'Physical activities saved successfully! You will be transferred to the summary page in 2 seconds',
      });
      fetchUserActivities();

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch {
      setMessage({
        type: 'error',
        content: 'Errore nel salvataggio attività.',
      });
    }
  };

  // Rimuove un'attività dell’utente
  const removeActivity = async (id: number) => {
    try {
      await removeUserPhysicalActivity(id);
      setMessage({ type: 'success', content: 'Physical activity removed' });
      fetchUserActivities();
    } catch {
      setMessage({
        type: 'error',
        content: 'Errore nella rimozione attività.',
      });
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserActivities();
      fetchAllActivities();
    }
  }, [userId]);

  return {
    userActivities,
    allActivities,
    selectedActivity,
    setSelectedActivity,
    durationMinutes,
    setDurationMinutes,
    date,
    setDate,
    fetchUserActivities,
    fetchAllActivities,
    saveActivity,
    removeActivity,
    message,
    setMessage,
    loadingActivities,
    specificActivity,
    setSpecificActivity
  };
}
