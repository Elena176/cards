import React from 'react';

import letter from '../../assets/letter.png';
import style from '../../style/Common.module.css';
import stylePopup from '../../style/Popup.module.css';

import { ReturnComponentType } from 'types';

export const Popup = (): ReturnComponentType => (
  <div>
    <div className={style.mainContainer}>
      <div className={style.content}>
        <img className={stylePopup.letterImg} src={letter} alt="letter" />
        <div className={style.contentWrap}>
          <h2 className={stylePopup.heading}>Check Email</h2>
          <p>We have sent the Email with instructions to your email </p>
        </div>
      </div>
    </div>
  </div>
);
