import React, { useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { PATH } from '../../enum';
import style from '../../style/Common.module.css';
import { CustomButton } from '../customButton';
import { CustomInput } from '../customInput';

import { AddNewPassType } from 'api';
import { useAppSelector, useInput } from 'hooks';
import {
  forgotPassAddEmailTC,
  getErrorNetworkMessage,
  getErrorValidMessage,
  getStatus,
  setErrorMessagePassAC,
} from 'store';
import { ReturnComponentType } from 'types';
import { isEmailValid } from 'utils';

export const ConfirmPassword = (): ReturnComponentType => {
  const [isShown, setShowMessage] = useState(false);
  const { value: email, handleValue: handleEmail, resetValue: resetEmail } = useInput('');

  const dispatch = useDispatch();

  const errorPassMessage = useAppSelector(getErrorValidMessage);
  const errorNetworkMessage = useAppSelector(getErrorNetworkMessage);
  const isLoading = useAppSelector(getStatus);

  const dataPayload: AddNewPassType = {
    email,
    from: 'test-front-admin <samutic40@gmail.com>',
    message: `<div style='background-color: #ffd500; 
padding: 15px; 
border-color: #ff9900; 
width: 250px;
height: 30px'> 
password recovery link: <a href='http://localhost:3000/#/createNewPassword/$token$'> recovery link </a></div>`,
  };

  const timeOut = 2000;
  const onSendButtonClick = (): void => {
    if (isEmailValid(email)) {
      dispatch(forgotPassAddEmailTC(dataPayload, setShowMessage));
      resetEmail('');
    } else {
      dispatch(setErrorMessagePassAC('invalid email ;-('));
      setTimeout(() => {
        dispatch(setErrorMessagePassAC(''));
      }, timeOut);
    }
  };

  if (isShown) {
    return <Navigate to="/popup" />;
  }

  return (
    <div className={style.mainContainer}>
      {isLoading === 'loading' ? (
        <CircularProgress />
      ) : (
        <div className={style.content}>
          <h2>Forgot your password?</h2>
          {errorPassMessage && <span style={{ color: 'red' }}> {errorPassMessage} </span>}
          {errorNetworkMessage && (
            <span style={{ color: 'red' }}> {errorNetworkMessage} </span>
          )}
          <div className={style.inputCentering}>
            <CustomInput
              placeholder="Email"
              typeInput="email"
              onChange={handleEmail}
              value={email}
            />
          </div>
          <p> Enter your email and we will send you further instructions</p>
          <div>
            <CustomButton title="Send instructions" onClick={onSendButtonClick} />
          </div>
          <span>Did you remember your password?</span>
          <Link to={PATH.LOGIN}> Try logging in </Link>
        </div>
      )}
    </div>
  );
};
