import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

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
    <Dialog open={visible} onClose={onDismiss}>
      <DialogTitle>Success</DialogTitle>
      <DialogContent>
        {typeof message === 'string' ? <Typography>{message}</Typography> : message}
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
}
