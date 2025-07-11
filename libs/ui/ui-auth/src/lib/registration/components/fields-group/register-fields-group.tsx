import { SpaceBetween } from '@cloudscape-design/components';
import {
  NameField,
  SurnameField,
  DateOfBirthField,
  PlaceOfBirthField,
  AddressField,
  GenderField,
  EmailField,
  PasswordField,
} from '@nextcart/ui-forms';

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
  onChange: (field: keyof RegisterFormData, value: any) => void;
  disabled?: boolean;
}

export function RegisterFieldsGroup({ formData, onChange, disabled }: Props) {
  return (
    <SpaceBetween size="m">
      <EmailField value={formData.email} onChange={(v) => onChange('email', v)} disabled={disabled} />
      <PasswordField value={formData.password} onChange={(v) => onChange('password', v)} disabled={disabled} />
      <PasswordField value={formData.confirmPassword} onChange={(v) => onChange('confirmPassword', v)} disabled={disabled} />
      <NameField value={formData.name} onChange={(v) => onChange('name', v)} disabled={disabled} />
      <SurnameField value={formData.surname || ''} onChange={(v) => onChange('surname', v)} disabled={disabled} />
      <DateOfBirthField value={formData.dateOfBirth} onChange={(v) => onChange('dateOfBirth', v)} disabled={disabled} />
      <PlaceOfBirthField value={formData.placeOfBirth || ''} onChange={(v) => onChange('placeOfBirth', v)} disabled={disabled} />
      <AddressField value={formData.address || ''} onChange={(v) => onChange('address', v)} disabled={disabled} />
      <GenderField value={formData.gender as Gender} onChange={(v) => onChange('gender', v)} />
    </SpaceBetween>
  );
}
