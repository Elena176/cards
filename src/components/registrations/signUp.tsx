import React from 'react';

import st from './Registrations.module.css';

import { CustomButton, CustomInput } from 'components';
import style from 'style/Common.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  email: string;
  password: string;
  handleEmail: () => void;
  confirmPassword: string;
  handlePassword: () => void;
  handleConfirmPassword: () => void;
  isFetching: boolean;
  onSendButtonClick: () => void;
  onCancelButtonClick: () => void;
  errorValid: any;
  errorNetwork: any;
};

export const SignUp = (props: PropsType): ReturnComponentType => {
  const {
    email,
    handleEmail,
    errorValid,
    errorNetwork,
    password,
    confirmPassword,
    handlePassword,
    handleConfirmPassword,
    onSendButtonClick,
    onCancelButtonClick,
    isFetching,
  } = props;
  return (
    <div className={style.mainContainer}>
      <div className={style.content}>
        <div className={style.contentWrap}>
          <h2>Registration</h2>
          <span style={{ color: 'red' }}> {errorValid} </span>
          <span style={{ color: 'red' }}> {errorNetwork} </span>
          <CustomInput
            placeholder="Email"
            typeInput="email"
            onChange={handleEmail}
            value={email}
            name="user[email]"
          />
          <CustomInput
            placeholder="Password"
            typeInput="password"
            onChange={handlePassword}
            value={password}
            name="user[password]"
          />
          <CustomInput
            placeholder="Confirm Password"
            typeInput="password"
            onChange={handleConfirmPassword}
            value={confirmPassword}
            name="user[password]"
          />
          <p> Have fun! </p>
          <div className={st.btns}>
            <CustomButton title="Cancel" onClick={onCancelButtonClick} />
            <CustomButton
              title="Create"
              onClick={onSendButtonClick}
              disabled={isFetching}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
