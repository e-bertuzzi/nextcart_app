// src/components/Homepage/FeatureCard.tsx
import { Container } from '@cloudscape-design/components';
import { JSX } from 'react';

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="text-center p-1">
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-4 text-emerald-600">{icon}</div>
      <h3 className="text-lg font-semibold text-emerald-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);
