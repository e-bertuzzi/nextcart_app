// src/components/Homepage/FeaturesSection.tsx
import { Grid, Button } from '@cloudscape-design/components';
import { FaShoppingCart, FaHeartbeat, FaUsers } from 'react-icons/fa';
import { FeatureCard } from './feature-card';
import { useNavigate } from 'react-router-dom';

export const FeaturesSection = () => {
  const navigate = useNavigate();
  return (
    <section className="max-w-6xl mx-auto px-6 py-6 text-center">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <FeatureCard
            icon={<FaShoppingCart className="w-12 h-12" />}
            title="Shopping management"
            description="Analyze and monitor your shopping habits for healthier and more conscious spending."
          />
        </div>
        <div className="flex-1">
          <FeatureCard
            icon={<FaHeartbeat className="w-12 h-12" />}
            title="Health"
            description="Keep track of your health with data, graphs and personalized advice."
          />
        </div>
        <div className="flex-1">
          <FeatureCard
            icon={<FaUsers className="w-12 h-12" />}
            title="For the whole family"
            description="Organize your family's data in a simple, convenient and shared way."
          />
        </div>
      </div>

      <div className="w-full max-w-xs mx-auto mt-12">
        <Button
          fullWidth
          variant="primary"
          className="py-4 text-lg"
          onClick={() => navigate('/dashboard')}
        >
          Start now
        </Button>
      </div>
    </section>
  );
};
