import styles from './modal-overlay.module.css';
import React from 'react';

interface IModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClose }) => {
  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    ></div>
  );
};
