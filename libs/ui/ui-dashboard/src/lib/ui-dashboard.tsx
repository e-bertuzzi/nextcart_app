import {
  ExpandableSection,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components';

import { DashboardGrid } from './components/dashboard-grid';
import { DashboardCard } from './components/dashboard-card';

export function UiDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-green-100 py-10 px-4">
      <div className="max-w-screen-xl mx-auto">
        <SpaceBetween size="l">

          <Header variant="h1" description="Explore and manage your activities with ease.">
            Welcome to Your Dashboard
          </Header>

          {/* Profile Section */}
          <ExpandableSection headerText="👤 Profile">
            <DashboardGrid>
              <DashboardCard
                label="Personal Data"
                iconName="user-profile"
                href="/edit-profile"
                description="Manage your personal data"
              />
              <DashboardCard
                label="Health"
                iconName="heart"
                href="/health"
                description="Track your health records"
              />
              <DashboardCard
                label="Diet"
                iconName="cutlery"
                href="/diet"
                description="Monitor your food intake"
              />
              <DashboardCard
                label="Family"
                iconName="group"
                href="/family"
                description="Manage your family profiles"
              />
            </DashboardGrid>
          </ExpandableSection>

          {/* Lifestyle Section */}
          <ExpandableSection headerText="🏃 Lifestyle Overview">
            <DashboardGrid columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <DashboardCard
                label="Purchases"
                iconName="shopping-cart"
                href="/purchases"
                description="Review your recent purchases"
              />
              <DashboardCard
                label="Physical Activity"
                iconName="bicycle"
                href="/activity"
                description="Track your workouts"
              />
              <DashboardCard
                label="Body Composition"
                iconName="scale"
                href="/body-composition"
                description="Analyze your body metrics"
              />
            </DashboardGrid>
          </ExpandableSection>

          {/* Analytics Section */}
          <ExpandableSection headerText="📊 Analytics">
            <DashboardGrid>
              <DashboardCard label="Analytics 1" iconName="bar-chart" href="#" description="Insights & stats" />
              <DashboardCard label="Analytics 2" iconName="line-chart" href="#" description="Progress tracking" />
              <DashboardCard label="Analytics 3" iconName="trend-up" href="#" description="Growth overview" />
              <DashboardCard label="Analytics 4" iconName="bar-chart" href="#" description="Full analytics view" />
            </DashboardGrid>
          </ExpandableSection>

        </SpaceBetween>
      </div>
    </div>
  );
}
