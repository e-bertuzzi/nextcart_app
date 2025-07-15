import React, { useState } from 'react';
import { RadioGroup, Option as RadioOption } from '../health-conditions-form/components/radio-group';
import { CheckboxGroup, Option as CheckboxOption } from '../health-conditions-form/components/checkbox-group';
import { Box, Container } from '@cloudscape-design/components';

const ageSexOptions: RadioOption[] = [
  { id: 50, label: 'Children 1-3 years' },
  { id: 51, label: 'Children 4-6 years' },
  { id: 52, label: 'Children 7-10 years' },
  { id: 35, label: 'Adolescent Female 11-14 years' },
  { id: 36, label: 'Adolescent Female 14-17 years' },
  { id: 37, label: 'Adolescent Male 11-14 years' },
  { id: 38, label: 'Adolescent Male 15-17 years' },
  { id: 39, label: 'Adult Female 18-29 years' },
  { id: 40, label: 'Adult Female 30-59 years' },
  { id: 41, label: 'Adult Female 60-74 years' },
  { id: 42, label: 'Adult Male 18-29 years' },
  { id: 43, label: 'Adult Male 30-59 years' },
  { id: 44, label: 'Adult Male 60-74 years' },
  { id: 48, label: 'Senior Female > 74 years' },
  { id: 49, label: 'Senior Male > 74 years' },
  { id: 45, label: 'Healthy Adult' },
];

const healthConditionsOptions: CheckboxOption[] = [
  { id: 47, label: 'Anemia' },
  { id: 53, label: 'Celiac disease' },
  { id: 54, label: 'Diabetes' },
  { id: 59, label: 'Lactose intolerance' },
  { id: 60, label: 'High cholesterol' },
  { id: 61, label: 'Hypertension' },
  { id: 62, label: 'Hyperthyroidism' },
  { id: 63, label: 'Hypothyroidism' },
  { id: 66, label: 'Obesity' },
  { id: 67, label: 'Osteoporosis' },
  { id: 68, label: 'Gastroesophageal reflux' },
];

const physiologicalStatesOptions: CheckboxOption[] = [
  { id: 46, label: 'Breastfeeding' },
  { id: 55, label: 'Pregnancy' },
  { id: 56, label: 'Pregnancy 1st trimester' },
  { id: 57, label: 'Pregnancy 2nd trimester' },
  { id: 58, label: 'Pregnancy 3rd trimester' },
  { id: 64, label: 'Infant 6-12 months' },
  { id: 65, label: 'Menopause' },
];

// Nelle tue RadioGroup e CheckboxGroup, assicurati che renderizzino ogni opzione in un div che può ereditare una griglia

// HealthForm.tsx
// (omettendo gli import e array per brevità — restano invariati)

export function HealthForm() {
  const [selectedAgeSex, setSelectedAgeSex] = useState<number | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<number[]>([]);
  const [selectedPhysStates, setSelectedPhysStates] = useState<number[]>([]);

  const handleConditionChange = (id: number) => {
    setSelectedConditions(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handlePhysStateChange = (id: number) => {
    setSelectedPhysStates(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      ageSex: selectedAgeSex,
      healthConditions: selectedConditions,
      physiologicalStates: selectedPhysStates,
    });
  };

  const getLabelById = (id: number, options: { id: number; label: string }[]) =>
    options.find(option => option.id === id)?.label || '';

  return (
    <Box padding="l" className="bg-gradient-to-b from-white via-emerald-50 to-green-100 min-h-screen">
      <div className="flex justify-center mt-6">
        <Container
          className="w-full max-w-2xl"
          header={<h2 className="text-emerald-700 font-bold text-xl mb-4 text-center">Health Form</h2>}
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">

              {/* Age & Gender Group */}
              <div className="mt-4">
                <fieldset>
                  <legend className="font-semibold text-gray-800 mb-2">Age and Gender Group</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {ageSexOptions.map(opt => (
                      <label key={opt.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="ageSex"
                          checked={selectedAgeSex === opt.id}
                          onChange={() => setSelectedAgeSex(opt.id)}
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Health Conditions */}
              <fieldset>
                <legend className="font-semibold text-gray-800 mb-2">Health Conditions</legend>
                <div className="grid grid-cols-2 gap-2">
                  {healthConditionsOptions.map(opt => (
                    <label key={opt.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="healthConditions"
                        checked={selectedConditions.includes(opt.id)}
                        onChange={() => handleConditionChange(opt.id)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Physiological States */}
              <fieldset>
                <legend className="font-semibold text-gray-800 mb-2">Physiological States</legend>
                <div className="grid grid-cols-2 gap-2">
                  {physiologicalStatesOptions.map(opt => (
                    <label key={opt.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="physiologicalStates"
                        checked={selectedPhysStates.includes(opt.id)}
                        onChange={() => handlePhysStateChange(opt.id)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Submit Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  Save
                </button>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-md p-4 border border-emerald-200 shadow-sm">
                <h3 className="text-emerald-700 font-semibold mb-2">Selection Summary</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>
                    <strong>Age/Sex:</strong>{' '}
                    {selectedAgeSex !== null ? getLabelById(selectedAgeSex, ageSexOptions) : 'Not selected'}
                  </li>
                  <li>
                    <strong>Health Conditions:</strong>{' '}
                    {selectedConditions.length > 0
                      ? selectedConditions.map(id => getLabelById(id, healthConditionsOptions)).join(', ')
                      : 'None selected'}
                  </li>
                  <li>
                    <strong>Physiological States:</strong>{' '}
                    {selectedPhysStates.length > 0
                      ? selectedPhysStates.map(id => getLabelById(id, physiologicalStatesOptions)).join(', ')
                      : 'None selected'}
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </Container>
      </div>
    </Box>
  );
}
