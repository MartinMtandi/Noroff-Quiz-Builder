import React from 'react';
import Modal from './Modal';
import { Button } from '@/components/ui';

interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  /** Dialog title */
  title?: string;
  /** Main message */
  message: string;
  /** Customise confirm button text */
  confirmText?: string;
  /** Customise cancel button text */
  cancelText?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      footer={
        <>
          <Button variant="ghost" onClick={onCancel}>{cancelText}</Button>
          <Button variant="gradient" onClick={onConfirm}>{confirmText}</Button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmationDialog;
