import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RegisterParamsType } from '../../api';

import st from './Registrations.module.css';

import { CustomButton, CustomInput } from 'components';
import { PATH, requestStatus } from 'enum';
import { useAppSelector, useInput } from 'hooks';
import {
  signUpTC,
  getErrorNetworkMessage,
  getErrorValidMessage,
  getStatus,
  RootStoreType,
  setErrorMessagePassAC,
} from 'store';
import style from 'style/Common.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';
import { isEmailValid, isPasswordValid } from 'utils';

export const SignUp = (): ReturnComponentType => {
  const { value: email, handleValue: handleEmail, resetValue: resetEmail } = useInput('');
  const {
    value: password,
    handleValue: handlePassword,
    resetValue: resetPassword,
  } = useInput('');
  const {
    value: confirmPassword,
    handleValue: handleConfirmPassword,
    resetValue: resetConfirmPassword,
  } = useInput('');

  const isLoading = useAppSelector(getStatus);
  const isSignUp = useSelector<RootStoreType, boolean>(state => state.signUp.isSignUp);
  const errorPassMessage = useAppSelector(getErrorValidMessage);
  const errorNetworkMessage = useAppSelector(getErrorNetworkMessage);

  const dispatch = useDispatch();

  const data: RegisterParamsType = {
    email,
    password,
  };
  const timeOut = 1000;

  const onCancelButtonClick = (): void => {
    resetEmail('');
    resetPassword('');
    resetConfirmPassword('');
  };

  const onSendButtonClick = (): void => {
    if (
      password !== confirmPassword ||
      password === null ||
      confirmPassword === null ||
      !isPasswordValid(password) ||
      !isEmailValid(email)
    ) {
      dispatch(setErrorMessagePassAC('invalid data ;-('));
      setTimeout(() => {
        dispatch(setErrorMessagePassAC(''));
      }, timeOut);
    }
    if (isPasswordValid(password) && isEmailValid(email)) {
      dispatch(signUpTC(data));
      resetPassword('');
      resetEmail('');
      resetConfirmPassword('');
    }
  };
  if (isSignUp) {
    return <Navigate to={PATH.LOGIN} />;
  }
  return (
    <div className={style.mainContainer}>
      <div className={style.content}>
        <div className={style.contentWrap}>
          <h2>Registration</h2>
          <div>
            <span style={{ color: 'red' }}> {errorPassMessage} </span>
            <span style={{ color: 'red' }}> {errorNetworkMessage} </span>
          </div>
          <CustomInput
            placeholder="Email"
            typeInput="text"
            onChange={handleEmail}
            value={email}
          />
          <CustomInput
            placeholder="Password"
            typeInput="password"
            onChange={handlePassword}
            value={password}
          />
          <CustomInput
            placeholder="Confirm Password"
            typeInput="password"
            onChange={handleConfirmPassword}
            value={confirmPassword}
          />
          <p> Have fun! </p>
          <div className={st.btns}>
            <CustomButton title="Cancel" onClick={onCancelButtonClick} />
            <CustomButton
              title="Create"
              onClick={onSendButtonClick}
              disabled={isLoading === requestStatus.loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
