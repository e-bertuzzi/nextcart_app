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
      <Container header={<b>Health Condition Selection</b>}>
      <div style={{ marginBottom: '16px' }}>
        <h2>Warning: All previously selected conditions will be overwritten.</h2>
      </div>

        <Form>
          <SpaceBetween size="l">
            {message && (
              <Flashbar
                items={[{
                  type: message.type,
                  content: message.content,
                  dismissible: true,
                  onDismiss: () => setMessage(null),
                }]}
              />
            )}

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

            {(step === 3) && (
              <Button variant="primary" onClick={saveSelectedConditions} disabled={!selectedAgeCondition}>
                Save
              </Button>
            )}
          </SpaceBetween>
        </Form>
      </Container>
    </Box>
  );
}
