import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
}

export default function ErrorModal({ visible, message, onDismiss }: ErrorModalProps) {
  return (
    <Dialog open={visible} onClose={onDismiss}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
