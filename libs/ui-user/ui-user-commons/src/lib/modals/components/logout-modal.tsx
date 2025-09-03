// components/Navbar/LogoutModal.tsx
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
}

export function UiLogoutModal({ visible, onClose }: LogoutModalProps) {
  return (
    <Dialog
      open={visible}
      onClose={onClose}
      aria-labelledby="logout-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="logout-dialog-title" sx={{ textAlign: 'center' }}>
        Logout successful
      </DialogTitle>
      <DialogContent>
        <Typography align="center" variant="body2">
          You&apos;ve been successfully logged out. You&apos;ll be redirected to the homepage...
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default UiLogoutModal;
