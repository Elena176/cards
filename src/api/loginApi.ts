import { AxiosResponse } from 'axios';

import { Nullable } from '../types';

import { instance } from './apiConfig';

export const authAPI = {
  login(params: LoginParamsType) {
    return instance.post<
      LoginParamsType,
      /* 'сам объект сервера который отправляет игнат' */
      /* AxiosResponse нужен только у методов put и post */
      AxiosResponse<ResponseType>
    >('auth/login', params);
  },
  logOut() {
    return instance.delete<ResponseType>('auth/me', {});
  },
  me() {
    return instance.post<ResponseType>('auth/me');
  },
  register(params: RegisterParamsType) {
    return instance.post<RegisterParamsType, any>('auth/register', params);
  },
};

export const profileAPI = {
  updateProfile(paramsUpdate: UpdateProfileType) {
    return instance.put('/auth/me', paramsUpdate);
  },
};

// types
export type UpdateProfileType = {
  name: string;
  avatar: Nullable<string>;
  email?: Nullable<string>;
};
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type RegisterParamsType = {
  email: string;
  password: string;
};

export type ResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};
