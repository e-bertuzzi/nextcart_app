import React from 'react';
import { HealthSummary } from '../lib/health-conditions-form/health-conditions-summary';
import { HealthForm } from './health-conditions-form/health-conditions-form';

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
