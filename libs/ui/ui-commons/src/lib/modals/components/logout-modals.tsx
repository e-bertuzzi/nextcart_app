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
      header="Logout successful"
      footer={null}
    >
      <p>You've been successfully logged out. You'll be redirected to the homepage...</p>
    </Modal>
  );
}
