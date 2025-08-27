// src/components/Homepage/HeroSection.tsx
import { Button } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {

  return (
    <section className="text-center py-10 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-4">
        Welcome on <span className="text-green-600">NextCart</span>
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Your ally for a healthy, conscious and sustainable lifestyle. Monitor spending, health and much more in one place.
      </p>
    </section>
  );
};
