import { Stack } from '@mui/material';
import { AddressField } from './fields/address-field';
import { NameField } from './fields/name-field';
import { SurnameField } from './fields/surname-field';
import { DateOfBirthField } from './fields/date-birth-field';
import { PlaceOfBirthField } from './fields/place-of-birth-field';
import { GenderField } from './fields/gender-field';
import { EmailField } from './fields/email-field';
import { PasswordField } from './fields/password-field';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { Gender } from '@nextcart/enum';

export interface RegisterFormData {
  name: string;
  surname?: string;
  dateOfBirth: string;
  placeOfBirth?: string;
  address?: string;
  gender: Gender;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  formData: RegisterFormData;
  errors?: Partial<Record<keyof RegisterFormData, string>>;
  onChange: (field: keyof RegisterFormData, value: any) => void;
  disabled?: boolean;
}

export function RegisterFieldsGroup({ formData, errors, onChange, disabled }: Props) {
  return (
    <Stack spacing={2}>
      <EmailField
        value={formData.email}
        onChange={(v) => onChange('email', v)}
        disabled={disabled}
        error={errors?.email}
      />
      <PasswordField
        value={formData.password}
        onChange={(v) => onChange('password', v)}
        disabled={disabled}
        error={errors?.password}
      />
      <PasswordField
        value={formData.confirmPassword}
        onChange={(v) => onChange('confirmPassword', v)}
        label="Confirm Password *"
        disabled={disabled}
        error={errors?.confirmPassword}
      />
      <NameField
        value={formData.name}
        onChange={(v) => onChange('name', v)}
        disabled={disabled}
        error={errors?.name}
      />
      <SurnameField
        value={formData.surname || ''}
        onChange={(v) => onChange('surname', v)}
        disabled={disabled}
        error={errors?.surname}
      />
      <DateOfBirthField
        value={formData.dateOfBirth}
        onChange={(v: any) => onChange('dateOfBirth', v)}
        disabled={disabled}
        error={errors?.dateOfBirth}
      />
      <PlaceOfBirthField
        value={formData.placeOfBirth || ''}
        onChange={(v) => onChange('placeOfBirth', v)}
        disabled={disabled}
        error={errors?.placeOfBirth}
      />
      <AddressField
        value={formData.address || ''}
        onChange={(v) => onChange('address', v)}
        disabled={disabled}
        error={errors?.address}
      />
      <GenderField
        value={formData.gender as Gender}
        onChange={(v) => onChange('gender', v)}
        disabled={disabled}
        error={errors?.gender}
      />
    </Stack>
  );
}
