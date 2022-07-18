import React from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RegisterParamsType } from '../../api';
import { toggleIsSignUpAC } from '../../store/reducers/signUp';
import styleRegister from '../../style/Registrations.module.css';

import { CustomButton, CustomInput } from 'components';
import { PATH, requestStatus } from 'enum';
import { useAppSelector, useInput } from 'hooks';
import {
  signUpTC,
  getErrorNetworkMessage,
  getErrorValidMessage,
  getStatus,
  setErrorMessagePassAC,
} from 'store';
import { getIsSignUp } from 'store/selectors';
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
  const isSignUp = useAppSelector(getIsSignUp);
  const errorPassMessage = useAppSelector(getErrorValidMessage);
  const errorNetworkMessage = useAppSelector(getErrorNetworkMessage);

  const dispatch = useDispatch();

  const data: RegisterParamsType = {
    email,
    password,
  };
  const timeOut = 3000;

  const onCancelButtonClick = (): void => {
    dispatch(toggleIsSignUpAC(true));
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
        <h2>SignUp</h2>
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
        {errorPassMessage || errorNetworkMessage ? (
          <div>
            <span style={{ color: 'red' }}> {errorPassMessage} </span>
            <span style={{ color: 'red' }}> {errorNetworkMessage} </span>
          </div>
        ) : (
          <div />
        )}
        <div className={styleRegister.btns}>
          <CustomButton
            style={{
              maxWidth: '124px',
              marginRight: '18px',
              background: '#D7D8EF',
              color: '#25142E',
            }}
            title="Cancel"
            onClick={onCancelButtonClick}
          />
          <CustomButton
            style={{
              maxWidth: '187px',
            }}
            title="Register"
            onClick={onSendButtonClick}
            disabled={isLoading === requestStatus.loading}
          />
        </div>
      </div>
    </div>
  );
};
