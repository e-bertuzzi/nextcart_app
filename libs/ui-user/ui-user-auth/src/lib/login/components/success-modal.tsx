import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

interface SuccessModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function SuccessModal({ visible, onDismiss }: SuccessModalProps) {
  return (
    <Dialog
      open={visible}
      onClose={onDismiss}
      aria-labelledby="success-dialog-title"
      aria-describedby="success-dialog-description"
    >
      <DialogTitle id="success-dialog-title">Login successful ✅</DialogTitle>
      <DialogContent>
        <DialogContentText id="success-dialog-description">
          You will be redirected to the homepage in a few seconds...
        </DialogContentText>
      </DialogContent>
      {/* 🔹 Tolto <DialogActions> con il pulsante Close */}
    </Dialog>
  );
}
