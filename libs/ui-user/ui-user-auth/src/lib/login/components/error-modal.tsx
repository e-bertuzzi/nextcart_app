import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
}

export default function ErrorModal({ visible, message, onDismiss }: ErrorModalProps) {
  return (
    <Dialog
      open={visible}
      onClose={onDismiss}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title">Login error</DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
