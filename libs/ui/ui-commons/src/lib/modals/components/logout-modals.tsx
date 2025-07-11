// components/Navbar/LogoutModal.tsx
import { Modal } from '@cloudscape-design/components';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LogoutModal({ visible, onClose }: LogoutModalProps) {
  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      header="Logout riuscito"
      footer={null}
    >
      <p>Sei stato disconnesso con successo. Verrai reindirizzato alla homepage...</p>
    </Modal>
  );
}
