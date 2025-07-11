// src/components/Homepage/HeroSection.tsx
import { Button } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="text-center py-20 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-4">
        Welcome on <span className="text-green-600">NextCart</span>
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
        Your ally for a healthy, conscious and sustainable lifestyle. Monitor spending, health and much more in one place.
      </p>
      <Button
        variant="primary"
        onClick={() => navigate('/dashboard')}
        className="!bg-emerald-600 !hover:bg-emerald-700 !text-white rounded-full px-6 py-2 shadow"
      >
        Start now
      </Button>
    </section>
  );
};
