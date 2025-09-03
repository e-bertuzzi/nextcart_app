// components/profile-fields-group/EditUserFieldsGroup.tsx
import { Box, Stack } from '@mui/material';
import { NameField } from '@nextcart/ui-user-auth';
import { SurnameField } from '@nextcart/ui-user-auth';
import { DateOfBirthField } from '@nextcart/ui-user-auth';
import { PlaceOfBirthField } from '@nextcart/ui-user-auth';
import { AddressField } from '@nextcart/ui-user-auth';
import { GenderField } from '@nextcart/ui-user-auth';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Gender } from '@nextcart/enum';

export interface SharedFormData {
  name: string;
  surname?: string;
  dateOfBirth: string;
  placeOfBirth?: string;
  address?: string;
  gender: Gender;
}

interface Props {
  formData: SharedFormData;
  onChange: (field: keyof SharedFormData, value: any) => void;
  disabled?: boolean;
}

export function EditUserFieldsGroup({ formData, onChange, disabled }: Props) {
  console.log('formData received:', formData);
  return (
    <Stack spacing={2} direction="column">
      <NameField value={formData.name} onChange={(v) => onChange('name', v)} />
      <SurnameField
        value={formData.surname || ''}
        onChange={(v) => onChange('surname', v)}
      />
      
      <DateOfBirthField
        value={formData.dateOfBirth ? formData.dateOfBirth.split(' ')[0] : ''}
        onChange={(v) => onChange('dateOfBirth', v)}
        disabled={disabled}
      />

      <PlaceOfBirthField
        value={formData.placeOfBirth || ''}
        onChange={(v) => onChange('placeOfBirth', v)}
      />
      <AddressField
        value={formData.address || ''}
        onChange={(v) => onChange('address', v)}
      />
      <GenderField
        value={formData.gender}
        onChange={(v) => onChange('gender', v)}
      />
    </Stack>
  );
}
