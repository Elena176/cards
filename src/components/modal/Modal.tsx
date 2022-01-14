import React, { FC, useState } from 'react';

import s from './Modal.module.css';

type ModalProps = {
  title: string;
  onClick: () => void;
};

export const Modal: FC<ModalProps> = ({ title, onClick, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClickCancel = (): void => {
    setIsOpen(false);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isOpen && (
        <div className={s.modalContainer}>
          <div className={s.modalWindow}>
            <div className={s.modalBody}>
              <div className={s.modalTitle}>{title}</div>
              <div className={s.modalBody}>{children}</div>
              <button className={s.modalCancel} onClick={onClickCancel}>
                Cancel
              </button>
              <button onClick={onClick}>Ok</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
/*
type ModalProps = {
  open: boolean;
  onClick: () => void;
};

export const Modal: FC<ModalProps> = ({ open, onClick, children }) => (
  <div>
    {open && (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
      <div className={s.wrapper} role="main" onClick={onClick}>
        {/!* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions *!/}
        <div className={s.container} role="note" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )}
  </div>
);
*/
