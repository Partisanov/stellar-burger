import styles from './modal-overlay.module.css';
import React from 'react';
import ReactDOM from 'react-dom';

interface IModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalOverlay = ({ onClose, children }: IModalOverlayProps) => {
  const root = document.getElementById('modal');

  if (!root) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    root,
  );
};
