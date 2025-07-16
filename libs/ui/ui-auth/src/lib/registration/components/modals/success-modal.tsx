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
        <div className="mx-auto w-fit rounded shadow overflow-hidden">
          <Button onClick={handleClick} variant="primary">
            OK
          </Button>
        </div>
      }
    >
      {typeof message === 'string' ? <p>{message}</p> : message}
    </Modal>
  );
}
