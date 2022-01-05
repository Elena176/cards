import React, { ChangeEvent, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { CustomInput } from '../customInput';

import st from './Login.module.css';

import { CustomButton, Preloader } from 'components';
import { PATH, requestStatus } from 'enum';
import { useAppSelector, useInput } from 'hooks';
import {
  getErrorNetworkMessage,
  getErrorValidMessage,
  setErrorMessagePassAC,
  logInTC,
} from 'store';
import { setAppStatusAC } from 'store/reducers';
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
  /* const errorMessage = useAppSelector(getErrorMessage); */
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
      dispatch(setAppStatusAC(requestStatus.succeeded));
    }
  };
  if (isDataLoaded) {
    return <Navigate to={PATH.PROFILE} />;
  }

  return (
    <div className={style.mainContainer}>
      {isLoading === 'loading' ? (
        <Preloader />
      ) : (
        <div className={style.content}>
          <div className={style.contentWrap}>
            <h2> Login </h2>
            {errorPassMessage && (
              <span style={{ color: 'red' }}> {errorPassMessage} </span>
            )}
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
            <div className={st.rememberMeInput}>
              remember me
              <input type="checkbox" checked={rememberMe} onChange={onChangeCheckBox} />
            </div>
            <div>
              <Link to={PATH.CONFIRM_PASSWORD}> Forgot password </Link>
            </div>
            <div style={{ minWidth: '50px' }}>
              <CustomButton title="Sign In" onClick={onClickHandleLogin} />
            </div>
            {/* <button onClick={onClickHandlerLogin} className={style.btn}>
              Sign In
            </button> */}
            <p> Do not have an account? </p>
            <Link to={PATH.REGISTRATION}> Sign Up </Link>
          </div>
        </div>
      )}
    </div>
  );
};
