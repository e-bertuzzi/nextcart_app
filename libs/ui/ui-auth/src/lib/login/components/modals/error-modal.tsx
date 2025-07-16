import { Modal, Button } from '@cloudscape-design/components';

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
}

export default function ErrorModal({ visible, message, onDismiss }: ErrorModalProps) {
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      header="Login error"
      footer={
        // Wrappa il Button in un div con stili Tailwind
        <div className="rounded shadow overflow-hidden w-fit mx-auto">
          <Button onClick={onDismiss} variant="primary" data-testid="close-error-button">
            Close
          </Button>
        </div>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}
