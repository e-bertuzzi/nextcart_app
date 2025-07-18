import React from 'react';
import { HealthSummary } from '../lib/health-conditions-form/health-conditions-summary';
import { HealthForm } from './health-conditions-form/health-conditions-form';
import { DietForm } from './diet-form/diet-form';
import { DietSummary } from './diet-form/diet-summary';

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
