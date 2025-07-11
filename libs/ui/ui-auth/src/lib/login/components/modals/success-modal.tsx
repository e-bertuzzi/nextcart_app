import { Modal } from '@cloudscape-design/components';

interface SuccessModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function SuccessModal({ visible, onDismiss }: SuccessModalProps) {
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      header="Login riuscito"
      footer={null}
    >
      <p>Accesso effettuato con successo! Verrai reindirizzato alla homepage...</p>
    </Modal>
  );
}