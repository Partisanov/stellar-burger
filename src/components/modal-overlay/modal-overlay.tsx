import styles from './modal-overlay.module.css';
import React from 'react';

interface IModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay = ({ onClose }: IModalOverlayProps) => {
  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    ></div>
  );
};
