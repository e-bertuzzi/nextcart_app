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
      header="Login successful"
      footer={null}
    >
      <p>Login successful! You'll be redirected to the homepage...</p>
    </Modal>
  );
}