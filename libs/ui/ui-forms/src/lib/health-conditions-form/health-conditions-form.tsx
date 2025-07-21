import {
  Container,
  Form,
  SpaceBetween,
  Button,
  Box,
  Flashbar,
} from '@cloudscape-design/components';
import { useState } from 'react';
import { useHealthConditions } from './hook/use-health-conditions';
import { AgeConditionSelect } from './components/age-condition-select';
import { PathologyMultiselect } from './components/pathology-multi-select';
import { PhysiologicalStateMultiselect } from './components/physiological-state-multi-select';

export function HealthForm() {
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
  } = useHealthConditions();

  const [step, setStep] = useState(1);

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
                options={pathologies}
                onChange={(opts) => {
                  setSelectedPathologies(opts);
                  setStep(3);
                  setSelectedPhysStates([]);
                }}
              />
            )}

            {step >= 3 && (
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
