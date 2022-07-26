import { FC } from 'react';

import { createPortal } from 'react-dom';

import styleModal from './Modal.module.css';

type ModalType = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
};
export const Modal: FC<ModalType> = ({ isOpen, children, onClose }): any => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styleModal.overlay}>
      <div className={styleModal.modal}>
        <div>
          <button className={styleModal.closeButton} onClick={onClose}>
            x
          </button>

          <div className={styleModal.modalContent}> {children} </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  );
};
