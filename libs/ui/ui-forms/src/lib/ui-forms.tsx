import React from 'react';
import { HealthSummary } from '../lib/health-conditions-form/health-conditions-summary';
import { HealthForm } from './health-conditions-form/health-conditions-form';
import { DietForm } from './diet-form/diet-form';
import { DietSummary } from './diet-form/diet-summary';
import { BodyCompositionSummary } from './body-compositions-form/body-compositions-summary';
import { BodyCompositionForm } from './body-compositions-form/body-composition-form';

export function UiHealthPage() {
  return (
    <HealthSummary />
  );
}

export function UiHealthEdit() {
  return (
    <HealthForm />
  );
}

export function UiDietPage() {
  return (
    <DietSummary />
  )
}

export function UiDietEdit() {
  return (
    <DietForm />
  );
}

export function UiBodyPage() {
  return (
    <BodyCompositionSummary />
  );
}

export function UiBodyForm() {
  return (
    <BodyCompositionForm />
  );
}
