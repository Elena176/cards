import React, { ChangeEvent, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import styleLogin from '../../../style/Login.module.css';
import { CustomInput } from '../../customComponents';

import { CustomButton } from 'components';
import { PATH, requestStatus } from 'enum';
import { useAppSelector, useInput } from 'hooks';
import {
  getErrorNetworkMessage,
  getErrorValidMessage,
  logInTC,
  setErrorMessagePassAC,
} from 'store';
import { getIsDataLoaded, getStatus } from 'store/selectors';
import style from 'style/Common.module.css';
import { ReturnComponentType } from 'types';
import { isEmailValid, isPasswordValid } from 'utils';

export const Login = (): ReturnComponentType => {
  const [rememberMe, handleRememberMe] = useState<boolean>(false);
  const { value: email, handleValue: handleEmail, resetValue: resetEmail } = useInput('');
  const {
    value: password,
    handleValue: handlePassword,
    resetValue: resetPassword,
  } = useInput('');

  const dispatch = useDispatch();

  const isDataLoaded = useAppSelector(getIsDataLoaded);
  const isLoading = useAppSelector(getStatus);
  const errorPassMessage = useAppSelector(getErrorValidMessage);
  const errorNetworkMessage = useAppSelector(getErrorNetworkMessage);

  const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>): void =>
    handleRememberMe(e.currentTarget.checked);
  const timeOut = 2000;

  const onClickHandleLogin = (): void => {
    if (!isPasswordValid(password) || !isEmailValid(email)) {
      dispatch(setErrorMessagePassAC('invalid data ;-('));
      setTimeout(() => {
        dispatch(setErrorMessagePassAC(''));
      }, timeOut);
      return;
    }
    if (isPasswordValid(password) && isEmailValid(email)) {
      dispatch(logInTC({ email, password, rememberMe }));
      resetEmail('');
      resetPassword('');
    }
  };
  if (isDataLoaded) {
    return <Navigate to={PATH.PACKS} />;
  }

  return (
    <div className={style.mainContainer}>
      {isLoading === requestStatus.loading ? (
        <CircularProgress />
      ) : (
        <div className={style.content}>
          <h2> SignIn </h2>
          {errorPassMessage && <span style={{ color: 'red' }}> {errorPassMessage} </span>}
          {errorNetworkMessage && (
            <span style={{ color: 'red' }}> {errorNetworkMessage} </span>
          )}
          <CustomInput
            onChange={handleEmail}
            value={email}
            placeholder="Email"
            typeInput="text"
          />
          <CustomInput
            placeholder="password"
            typeInput="password"
            value={password}
            onChange={handlePassword}
          />
          <div className={styleLogin.rememberMeInput}>
            remember me
            <input type="checkbox" checked={rememberMe} onChange={onChangeCheckBox} />
          </div>
          <div>
            <Link to={PATH.CONFIRM_PASSWORD}> Forgot password </Link>
          </div>
          <div style={{ minWidth: '266px' }}>
            <CustomButton
              title="Login"
              onClick={onClickHandleLogin}
              disabled={isLoading === requestStatus.loading}
            />
          </div>
          <p> Do not have an account? </p>
          <Link to={PATH.REGISTRATION}> Sign Up </Link>
        </div>
      )}
    </div>
  );
};
