import React, { FC } from 'react';

import s from './Modal.module.css';

type ModalProps = {
  open: boolean;
  onClick: () => void;
};

export const Modal: FC<ModalProps> = ({ open, onClick, children }) => (
  <div>
    {open && (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
      <div className={s.wrapper} role="main" onClick={onClick}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <div className={s.container} role="note" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )}
  </div>
);
