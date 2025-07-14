import { AppLayout } from '@cloudscape-design/components';
import { useState } from 'react';
import { DashboardNavigation } from '../lib/components/dashboard-navigation';
import { DashboardContent } from './components/dashboard-content';

export function UiDashboard() {
  const [content, setContent] = useState<string>('Welcome to your personal dashboard!');
  const [navigationOpen, setNavigationOpen] = useState(true);

  return (
    <AppLayout
      navigationOpen={navigationOpen}
      onNavigationChange={(event) => setNavigationOpen(event.detail.open)}
      navigation={
        <DashboardNavigation
          navigationOpen={navigationOpen}
          setNavigationOpen={setNavigationOpen}
          setContent={setContent}
        />
      }
      content={<DashboardContent content={content} />}
      toolsHide
      contentType="default"
      headerSelector="#header"
    />
  );
}
