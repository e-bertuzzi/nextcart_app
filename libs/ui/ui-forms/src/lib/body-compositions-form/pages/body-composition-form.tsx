import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormField,
  Input,
  SpaceBetween,
  DatePicker,
  Flashbar,
  Spinner,
} from '@cloudscape-design/components';
import { useBodyCompositions } from '../hook/use-body-compositions';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

interface BodyCompositionFormData {
  date: string;
  weight?: string;
  height?: string;
}

export function UiBodyEdit() {
  const location = useLocation();
  const navigate = useNavigate(); // 👈 serve per annullare
  const editRecord = location.state?.record;
  const { user, loading } = useUser();

  const userId = user?.id;  

  const {
    saveComposition,
    message,
    setMessage,
  } = useBodyCompositions(userId);

  const [formData, setFormData] = useState<BodyCompositionFormData>({
    date: editRecord?.date || '',
    weight: editRecord?.weight?.toString() || '',
    height: editRecord?.height?.toString() || '',
  });

  const [errors, setErrors] = useState<{ [key in keyof BodyCompositionFormData]?: string }>({});

  const handleChange = (key: keyof BodyCompositionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const newErrors: { date?: string } = {};
    if (!formData.date) newErrors.date = 'Date is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      setMessage?.({ type: 'error', content: 'Please fix the errors before submitting.' });
      return;
    }

    const dto = {
      date: formData.date,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      height: formData.height ? parseFloat(formData.height) : undefined,
    };

    saveComposition(dto, "/dashboard");
  };

  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box margin="l">
      <Container header={<h2>Add Body Composition</h2>}>
        <SpaceBetween size="l">
          {message && (
            <Flashbar
              items={[
                {
                  type: message.type,
                  content: message.content,
                  dismissible: true,
                  onDismiss: () => setMessage?.(null),
                },
              ]}
            />
          )}

          <FormField label="Date" stretch errorText={errors.date}>
            <DatePicker
              onChange={({ detail }) => handleChange('date', detail.value ?? '')}
              value={formData.date}
              placeholder="YYYY-MM-DD"
            />
          </FormField>

          <FormField label="Weight (kg)">
            <Input
              type="number"
              step="any"
              value={formData.weight ?? ''}
              onChange={({ detail }) => handleChange('weight', detail.value)}
            />
          </FormField>

          <FormField label="Height (cm)">
            <Input
              type="number"
              step="any"
              value={formData.height ?? ''}
              onChange={({ detail }) => handleChange('height', detail.value)}
            />
          </FormField>

          <SpaceBetween direction="horizontal" size="s">
            <Button variant="primary" onClick={handleSubmit}>
              Save Body Composition
            </Button>
            <Button variant="link" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </SpaceBetween>
        </SpaceBetween>
      </Container>
    </Box>
  );
}
