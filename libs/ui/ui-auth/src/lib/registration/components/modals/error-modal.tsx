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
      header="Errore"
      footer={
        // Contenitore Tailwind attorno al Button
        <div className="rounded overflow-hidden shadow w-fit mx-auto">
          <Button onClick={onDismiss} variant="primary">
            Close
          </Button>
        </div>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}
