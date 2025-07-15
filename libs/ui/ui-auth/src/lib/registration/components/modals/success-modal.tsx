import { Modal, Button } from '@cloudscape-design/components';

interface SuccessModalProps {
  visible: boolean;
  message: string | React.ReactNode;
  onDismiss: () => void;
  onButtonClick?: () => void;
}

export default function SuccessModal({
  visible,
  message,
  onDismiss,
  onButtonClick,
}: SuccessModalProps) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      onDismiss();
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      header="Success"
      footer={
        <Button
          onClick={handleClick}
          variant="primary"
          className="!bg-emerald-600 hover:!bg-emerald-700 !text-white rounded"
        >
          OK
        </Button>
      }
    >
      {typeof message === 'string' ? <p>{message}</p> : message}
    </Modal>
  );
}
