import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootStoreType } from '../../store';
import { setErrorMessagePassAC } from '../../store/reducers/errorReducer';
import { signUpTC } from '../../store/reducers/signUp';
import {
  getErrorNetworkMessage,
  getErrorValidMessage,
} from '../../store/selectors/confirmPassword';

import { SignUp } from './signUp';

import { PATH } from 'enum/pathes';
import { useAppSelector, useInput } from 'hooks';
import { ReturnComponentType } from 'types';
import { isEmailValid, isPasswordValid } from 'utils';

export const SignUpContainer = (): ReturnComponentType => {
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

  const isFetching = useSelector<RootStoreType, boolean>(
    state => state.signUp.isFetching,
  );
  const isSignUp = useSelector<RootStoreType, boolean>(state => state.signUp.isSignUp);
  const errorPassMessage = useAppSelector(getErrorValidMessage);
  const errorNetworkMessage = useAppSelector(getErrorNetworkMessage);

  const dispatch = useDispatch();

  const data: any = {
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
    <SignUp
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      handleEmail={handleEmail}
      handlePassword={handlePassword}
      handleConfirmPassword={handleConfirmPassword}
      isFetching={isFetching}
      onSendButtonClick={onSendButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      errorValid={errorPassMessage}
      errorNetwork={errorNetworkMessage}
    />
  );
};
