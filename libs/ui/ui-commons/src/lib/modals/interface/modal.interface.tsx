interface ModalGenericProps {
  visible: boolean;
  header: string;
  message: string | React.ReactNode;
  onDismiss: () => void;
  buttonText?: string;
  buttonVariant?: 'normal' | 'primary' | 'link'; // o altri varianti che supporta Button
  buttonClassName?: string;
  onButtonClick?: () => void;
}