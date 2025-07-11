// src/components/Homepage/FeaturesSection.tsx
import { Grid } from '@cloudscape-design/components';
import { FaShoppingCart, FaHeartbeat, FaUsers } from 'react-icons/fa';
import { FeatureCard } from './feature-card';

export const FeaturesSection = () => (
  <section className="max-w-6xl mx-auto px-6 py-8">
    <Grid gridDefinition={[{ colspan: { default: 12, xs: 4 } }, { colspan: { default: 12, xs: 4 } }, { colspan: { default: 12, xs: 4 } }]}>
      <FeatureCard
        icon={<FaShoppingCart className="w-12 h-12" />}
        title="Shopping management"
        description="Analyze and monitor your shopping habits for healthier and more conscious spending."
      />
      <FeatureCard
        icon={<FaHeartbeat className="w-12 h-12" />}
        title="Health"
        description="Keep track of your health with data, graphs and personalized advice."
      />
      <FeatureCard
        icon={<FaUsers className="w-12 h-12" />}
        title="For the whole family"
        description="Organize your family's data in a simple, convenient and shared way."
      />
    </Grid>
  </section>
);
