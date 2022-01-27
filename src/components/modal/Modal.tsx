import React, { FC } from 'react';

import s from './Modal.module.css';

export type ModalProps = {
  title: string;
  isOpen: boolean;
  setIsShown: (isOpen: boolean) => void;
};

export const Modal: FC<ModalProps> = ({ title, isOpen, setIsShown, children }) => {
  const onClickCancel = (): void => {
    setIsShown(false);
  };
  console.log('modal');

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={isOpen ? s.modalContainerActive : s.modalContainer}
      onClick={() => setIsShown(false)}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={s.modalBody} onClick={e => e.stopPropagation()}>
        <div className={s.modalTitle}>{title}</div>
        <div className={s.modalBody}>{children}</div>
        <button className={s.modalCancel} onClick={onClickCancel}>
          Cancel
        </button>
        <button onClick={() => setIsShown(false)}>Ok</button>
      </div>
    </div>
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
