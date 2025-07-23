import { useState, useEffect } from 'react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http'; // il file dove hai configurato axios con interceptor
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
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
        console.log(token)
        const res = await api.get('/profile/profile');
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
        setMessage({ type: 'error', content: 'Error loading user data.' });
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
      await api.put('profile/edit', formData);
      setMessage({ type: 'success', content: 'Profile updated successfully!' });
    } catch {
      setMessage({ type: 'error', content: 'Error updating profile.' });
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
