import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@/components/ui';
import { ModalProps } from '@/types/Index';

// Ensure portal root exists
const getPortalRoot = (): HTMLElement => {
  const existing = document.getElementById('modal-root');
  if (existing) return existing;
  const el = document.createElement('div');
  el.id = 'modal-root';
  document.body.appendChild(el);
  return el;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, footer, className }) => {
  const portalRoot = getPortalRoot();

  // Prevent background scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const dialog = (
    <div className={styles.dialog}>
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={onClose}
      />

      {/* Dialog */}
      <div className={styles.dialog}>
        {/* Header */}
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <Button variant="ghost" size="sm" aria-label="Close" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        <div className={styles.footer}>
          {footer ?? (
            <Button variant="gradient" onClick={onClose} size="md">
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(dialog, portalRoot);
};

const styles = {
  backdrop: "absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn",
  dialog: "relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 animate-scaleIn",
  header: "flex items-center justify-between p-4 border-b",
  body: "p-4",
  footer: "p-4 border-t flex justify-end gap-2",
  title: "text-lg font-medium",
}

export default Modal;
