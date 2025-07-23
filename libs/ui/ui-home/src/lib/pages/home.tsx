import { HeroSection } from '../components/hero-section';
import { FeaturesSection } from '../components/feature-section';

export function UiHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-green-100">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}

export default UiHome;
