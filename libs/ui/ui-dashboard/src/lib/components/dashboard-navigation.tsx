import {
  SideNavigation,
  SideNavigationProps,
  NonCancelableCustomEvent,
} from '@cloudscape-design/components';
import { useNavigate, useLocation } from 'react-router-dom';
import { navigationItems } from './navigation-items';

interface DashboardNavigationProps {
  navigationOpen: boolean;
  setNavigationOpen: (open: boolean) => void;
  setContent: (content: string) => void;
}

export function DashboardNavigation({
  navigationOpen,
  setNavigationOpen,
  setContent,
}: DashboardNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Gestore evento onFollow (clic su link)
  const handleNavigation = (
    event: NonCancelableCustomEvent<SideNavigationProps.FollowDetail>
  ) => {
    const { href } = event.detail;
    navigate(href);
    setContent(`Selected: ${href}`);
    setNavigationOpen(false);
  };

  // Gestore evento onChange (toggle del menu)
  const handleNavigationChange = (
    event: NonCancelableCustomEvent<SideNavigationProps.ChangeDetail>
  ) => {
    // Qui 'event.detail' contiene la lista delle sezioni aperte,
    // se vuoi aprire/chiudere il menu principale devi gestire tu lo stato,
    // oppure puoi ignorare questo evento se non usi sideNavigation come menu a scomparsa

    // Esempio: per chiudere/aprire la navigation, devi farlo altrove,
    // oppure non usare 'navigationOpen' se SideNavigation non lo supporta direttamente.
  };

  const items = navigationItems as SideNavigationProps.Item[];

  return (
    <SideNavigation
      activeHref={location.pathname}
      header={{ text: 'NextCart Dashboard', href: '/dashboard' }}
      items={items}
      onFollow={handleNavigation}
      onChange={handleNavigationChange}
      // NOTA: NON passare prop 'open' a SideNavigation (non esiste)
    />
  );
}
