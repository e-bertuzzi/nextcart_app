import { SpaceBetween } from '@cloudscape-design/components';
import { NameField } from '@nextcart/ui-forms';
import { SurnameField } from '@nextcart/ui-forms';
import { DateOfBirthField } from '@nextcart/ui-forms';
import { PlaceOfBirthField } from '@nextcart/ui-forms';
import { AddressField } from '@nextcart/ui-forms';
import { GenderField } from '@nextcart/ui-forms';

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

export function EditUserFieldsGroup({ formData, onChange }: Props) {
  return (
    <SpaceBetween size="m">
      <NameField value={formData.name} onChange={(v) => onChange('name', v)} />
      <SurnameField value={formData.surname || ''} onChange={(v) => onChange('surname', v)} />
      <DateOfBirthField value={formData.dateOfBirth} onChange={(v) => onChange('dateOfBirth', v)} />
      <PlaceOfBirthField value={formData.placeOfBirth || ''} onChange={(v) => onChange('placeOfBirth', v)} />
      <AddressField value={formData.address || ''} onChange={(v) => onChange('address', v)} />
      <GenderField value={formData.gender} onChange={(v) => onChange('gender', v)} />
    </SpaceBetween>
  );
}
