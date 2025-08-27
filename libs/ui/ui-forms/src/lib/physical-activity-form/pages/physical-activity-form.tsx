import {
  Container,
  Form,
  SpaceBetween,
  Button,
  Box,
  Flashbar,
  Spinner,
  Input,
  DatePicker,
  Select,
} from '@cloudscape-design/components';
import { usePhysicalActivity } from '../hook/use-physical-activity';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export function UiPhysicalActivityEdit() {
  const { user, loading } = useUser();
  const userId = user?.id;
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const {
    allActivities,
    selectedActivity,
    setSelectedActivity,
    specificActivity,
    setSpecificActivity,
    durationMinutes,
    setDurationMinutes,
    date,
    setDate,
    saveActivity,
    message,
    setMessage,
  } = usePhysicalActivity(userId);

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;

  const specificOptions = allActivities
    .filter((a) => a.type === selectedActivity?.value)
    .map((a) => ({
      value: a.id.toString(),
      label: a.name,
    }));

  return (
    <Box margin="l">
      <Container
        header={<h1 style={{ color: 'green' }}>Add Physical Activity</h1>}
      >
        <Form>
          <FormLayout message={message} setMessage={setMessage}>
            {/* Step 1 - Scelta tipo di attività */}
            <Select
              selectedOption={selectedActivity}
              onChange={({ detail }) => {
                setSelectedActivity(detail.selectedOption);
                setSpecificActivity(null);
                setStep(2);
              }}
              options={Array.from(
                new Set(allActivities.map((a) => a.type))
              ).map((type) => ({
                value: type,
                label: type,
              }))}
              placeholder="Select activity type"
            />

            {/* Step 2 - Scelta attività specifica */}
            {step >= 2 && (
              <Select
                selectedOption={specificActivity}
                onChange={({ detail }) => {
                  setSpecificActivity(detail.selectedOption);
                  setStep(3);
                }}
                options={specificOptions}
                placeholder="Select specific activity"
              />
            )}

            {/* Step 3 - Data e durata */}
            {step >= 3 && (
              <>
                <Box margin={{ bottom: 'xs' }}>
                  <label htmlFor="activity-date" style={{ fontWeight: 600 }}>
                    Select date
                  </label>
                </Box>
                <Box margin={{ bottom: 'l' }}>
                  <DatePicker
                    id="activity-date"
                    onChange={({ detail }) => setDate(detail.value!)}
                    value={date}
                    placeholder="Select date"
                  />
                </Box>

                <Box margin={{ bottom: 'xs' }}>
                  <label htmlFor="duration-minutes" style={{ fontWeight: 600 }}>
                    Duration
                  </label>
                </Box>
                <Box margin={{ bottom: 'l' }}>
                  <Input
                    id="duration-minutes"
                    value={durationMinutes.toString()}
                    onChange={({ detail }) =>
                      setDurationMinutes(Number(detail.value))
                    }
                    type="number"
                    placeholder="Minutes"
                    aria-label="Duration in minutes"
                  />
                  <span style={{ whiteSpace: 'nowrap', color: '#555' }}>
                    minutes
                  </span>
                </Box>
              </>
            )}

            {/* Pulsanti visibili sempre */}
            <SpaceBetween direction="horizontal" size="s">
              {step >= 3 && (
                <Button variant="primary" onClick={saveActivity}>
                  Save Activity
                </Button>
              )}
              <Button variant="link" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </SpaceBetween>
          </FormLayout>
        </Form>
      </Container>
    </Box>
  );
}

// Wrapper layout
function FormLayout({ children, message, setMessage }: any) {
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
