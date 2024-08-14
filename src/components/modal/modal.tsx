import React, { useCallback, useEffect } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay.tsx';
import { createPortal } from 'react-dom';

interface IModalProps {
  caption?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ caption, children, onClose }: IModalProps) => {
  const modalRoot = document.getElementById('modal');
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, false);

    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, [handleEsc]);

  const handleClose = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onClose();
  };

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div>
      <div className={styles.dialog}>
        <div className={`${styles.header} ml-10 mt-10 mr-10`}>
          <div className=' text text_type_main-large'>{caption}</div>
          <div
            className={styles['close-btn']}
            onClick={handleClose}
          >
            <CloseIcon type='primary' />
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={handleClose} />
    </div>,
    modalRoot,
  );
};
