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
        <Button
          onClick={onDismiss}
          variant="primary"
          className="!bg-emerald-600 hover:!bg-emerald-700 !text-white rounded"
        >
          Chiudi
        </Button>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}
