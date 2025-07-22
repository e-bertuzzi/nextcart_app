import {
  Container,
  Form,
  SpaceBetween,
  Button,
  Box,
  Flashbar,
  Spinner,
} from '@cloudscape-design/components';
import { useState } from 'react';
import { useHealthConditions } from './hook/use-health-conditions';
import { AgeConditionSelect } from './components/age-condition-select';
import { PathologyMultiselect } from './components/pathology-multi-select';
import { PhysiologicalStateMultiselect } from './components/physiological-state-multi-select';

import { useUser } from '@nextcart/ui-auth'
import { Navigate } from 'react-router-dom';

export function HealthForm() {

  const { user, loading } = useUser();
  const userId = user?.id;  // userId può essere undefined se user è null

  const {
    selectedAgeCondition,
    setSelectedAgeCondition,
    selectedPathologies,
    setSelectedPathologies,
    selectedPhysStates,
    setSelectedPhysStates,
    ageConditions,
    pathologies,
    physStates,
    saveSelectedConditions,
    message,
    setMessage,
  } = useHealthConditions(userId);

  const [step, setStep] = useState(1);

  if (loading) return <Spinner />; // oppure <div>Loading...</div>
  
    if (!user) {
      return <Navigate to="/login" />;
    }

  return (
    <Box margin="l">
      <Container header={
        <h1 style={{ color: 'green', fontWeight: 'bold' }}>
          Health conditions selection
        </h1>}>
        <Box margin={{ bottom: 'm' }}>
          <h2>Warning: All previously selected conditions will be overwritten.</h2>
        </Box>

        <Form>
          <FormLayout message={message} setMessage={setMessage}>
            <AgeConditionSelect
              selected={selectedAgeCondition}
              options={ageConditions}
              onChange={(option) => {
                setSelectedAgeCondition(option);
                setStep(2);
                setSelectedPathologies([]);
                setSelectedPhysStates([]);
              }}
            />

            {step >= 2 && (
              <PathologyMultiselect
                selected={selectedPathologies}
                options={[{ value: '0', label: 'No pathology' }, ...pathologies]}
                onChange={(opts) => {
                  const hasNone = opts.some(o => o.value === '0');

                  if (hasNone) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    setSelectedPathologies([opts.find(o => o.value === '0')!]);
                  } else {
                    setSelectedPathologies(opts.filter(o => o.value !== '0'));
                  }
                  setStep(3);
                  setSelectedPhysStates([]);
                }}
              />

            )}

            {step >= 3 && physStates.length > 0 && (
              <PhysiologicalStateMultiselect
                selected={selectedPhysStates}
                options={physStates}
                onChange={(opts) => setSelectedPhysStates(opts)}
              />
            )}

            {step === 3 && (
              <Button
                variant="primary"
                onClick={saveSelectedConditions}
                disabled={!selectedAgeCondition}
              >
                Save
              </Button>
            )}
          </FormLayout>
        </Form>
      </Container>
    </Box>
  );
}

// Shared layout wrapper for consistency with HealthSummary
function FormLayout({
  children,
  message,
  setMessage,
}: {
  children: React.ReactNode;
  message: any;
  setMessage: (msg: any) => void;
}) {
  return (
    <SpaceBetween size="l">
      {message && (
        <Flashbar
          items={[
            {
              type: message.type,
              content: message.content,
              dismissible: true,
              onDismiss: () => setMessage(null),
            },
          ]}
        />
      )}
      {children}
    </SpaceBetween>
  );
}