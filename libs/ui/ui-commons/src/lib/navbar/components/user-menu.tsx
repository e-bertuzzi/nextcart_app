// components/Navbar/UserMenu.tsx
import { Popover, SpaceBetween } from '@cloudscape-design/components';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface UserMenuProps {
  user: { email: string };
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <Popover
      dismissAriaLabel="Chiudi menu utente"
      position="bottom"
      size="small"
      triggerType="custom"
      content={
        <SpaceBetween size="xs">
          <span className="text-gray-600 text-sm">
            Accesso come <strong>{user.email}</strong>
          </span>
          <a href="/edit-profile" className="text-emerald-600 hover:underline text-sm">
            Profilo
          </a>
          <button onClick={onLogout} className="text-red-600 hover:text-red-700 text-sm text-left">
            Logout
          </button>
        </SpaceBetween>
      }
    >
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center gap-1 text-gray-700 hover:text-emerald-600 font-semibold text-base truncate max-w-[250px]"
        title={user.email}
      >
        {user.email}
        <ChevronDown size={16} />
      </button>
    </Popover>
  );
}
