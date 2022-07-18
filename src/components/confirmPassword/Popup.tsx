import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import letter from '../../assets/letter.png';
import { PATH } from '../../enum';
import style from '../../style/Common.module.css';
import stylePopup from '../../style/Popup.module.css';

import { ReturnComponentType } from 'types';

const time = 3000;
export const Popup = (): ReturnComponentType => {
  const navigate = useNavigate();
  function handleSubmit(): void {
    navigate(PATH.CREATE_NEW_PASSWORD);
  }
  useEffect(() => {
    setTimeout(() => handleSubmit, time);
  }, []);
  return (
    <div className={style.mainContainer}>
      <div className={`${style.content} + ${stylePopup.content}`}>
        <img className={stylePopup.letterImg} src={letter} alt="letter" />
        <div className={stylePopup.contentWrap}>
          <h2 className={stylePopup.heading}>Check Email</h2>
          <p>We have sent an Email with instructions to your email </p>
        </div>
      </div>
    </div>
  );
};
