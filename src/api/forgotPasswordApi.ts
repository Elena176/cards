import { AxiosResponse } from 'axios';

import { Nullable } from '../types';

import { instance } from './apiConfig';

export type AddNewPassType = {
  email: Nullable<string>;
  from?: Nullable<string>;
  message?: Nullable<string>;
};

export type SetNewPassType = {
  password: Nullable<string>;
  resetPasswordToken?: Nullable<string>;
};

export type AddNewPassResponseType = {
  info: Nullable<string>;
  error: Nullable<string>;
};

export const addNewPassAPI = {
  addNewPass(params: AddNewPassType) {
    return instance.post<AddNewPassType, AxiosResponse<AddNewPassResponseType>>(
      'auth/forgot',
      params,
    );
  },
  setNewPass(params: SetNewPassType) {
    return instance.post<SetNewPassType, AxiosResponse<AddNewPassResponseType>>(
      'auth/set-new-password',
      params,
    );
  },
};
