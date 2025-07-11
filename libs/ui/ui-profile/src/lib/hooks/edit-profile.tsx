import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@nextcart/ui-auth';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Gender } from '@nextcart/enum';

export interface FormData {
  name: string;
  surname?: string;
  dateOfBirth: string;
  placeOfBirth?: string;
  gender: Gender;
  address?: string;
}

export function useEditProfile() {
  const { user } = useUser();
  const token = user?.token;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: Gender.isMale,
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; content: string } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (!user) return;
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:3000/api/profile/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setFormData({
          name: data.name || '',
          surname: data.surname || '',
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.slice(0, 10) : '',
          placeOfBirth: data.placeOfBirth || '',
          gender: data.gender,
          address: data.address || '',
        });
      } catch {
        setMessage({ type: 'error', content: 'Errore nel caricamento dei dati utente.' });
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [user, token]);

  const onChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await axios.put('http://localhost:3000/api/profile/edit', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ type: 'success', content: 'Profilo aggiornato con successo!' });
    } catch {
      setMessage({ type: 'error', content: 'Errore durante l’aggiornamento del profilo.' });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    message,
    onChange,
    handleSubmit,
    setMessage, // per gestire dismiss di Flashbar
  };
}
