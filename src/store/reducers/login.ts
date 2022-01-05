import { ThunkDispatch } from 'redux-thunk';

import { setAppStatusAC, SetAppStatusActionType } from './appInitialized';
import { setErrorMessageNetworkAC } from './errorReducer';
import { logOutUserProfileType, setUserProfile, setUserProfileType } from './profile';

import { authAPI, LoginParamsType } from 'api/loginApi';
import { requestStatus } from 'enum';
import { RootStoreType } from 'store';
import { Nullable } from 'types';

export type InitialStateDataType = {
  isAuth: boolean;
  error?: Nullable<string>;
};

export const initialState: InitialStateDataType = {
  isAuth: false,
  error: null,
};

export type UserType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number; // количество колод
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error?: string;
};

export const loginReducer = (
  state: InitialStateDataType = initialState,
  action: ActionTypesLogin,
): InitialStateDataType => {
  switch (action.type) {
    case 'LOGIN/SET_AUTH_LOGIN_DATA':
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case 'LOGIN/SET_ERROR_MESSAGE':
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export const setAuthLoginDataAC = (isAuth: boolean) =>
  ({ type: 'LOGIN/SET_AUTH_LOGIN_DATA', isAuth } as const);

export const setErrorMessageAC = (error: Nullable<string>) =>
  ({ type: 'LOGIN/SET_ERROR_MESSAGE', error } as const);

export const setUserDataAC = (user: UserType) =>
  ({ type: 'LOGIN/SET_USER_DATA', user } as const);

export const logInTC =
  (data: LoginParamsType) =>
  (
    dispatch: ThunkDispatch<
      RootStoreType,
      undefined,
      ActionTypesLogin | ReturnType<typeof setErrorMessageNetworkAC>
    >,
  ) => {
    dispatch(setAppStatusAC(requestStatus.loading));
    authAPI
      .login(data)
      .then(res => {
        dispatch(setAuthLoginDataAC(true));
        dispatch(setUserProfile(res.data));
        dispatch(setAppStatusAC(requestStatus.succeeded));
      })
      .catch(e => {
        const errorNetwork = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setErrorMessageNetworkAC(errorNetwork));
        const timeOut = 3000;
        setTimeout(() => {
          dispatch(setErrorMessageNetworkAC(''));
        }, timeOut);
      })
      .finally(() => {
        dispatch(setAppStatusAC(requestStatus.succeeded));
      });
  };

export const logOutTC =
  () => (dispatch: ThunkDispatch<RootStoreType, undefined, ActionTypesLogin>) => {
    dispatch(setAppStatusAC(requestStatus.loading));
    authAPI.logOut().then(() => {
      dispatch(setAuthLoginDataAC(false));
      dispatch(setUserProfile(null));
      dispatch(setErrorMessageAC(''));
      dispatch(setAppStatusAC(requestStatus.idle));
    });
  };

// type;
export type setLoginData = ReturnType<typeof setAuthLoginDataAC>;
type setErrorMessageLogin = ReturnType<typeof setErrorMessageAC>;
export type ActionTypesLogin =
  | setLoginData
  | setErrorMessageLogin
  | SetAppStatusActionType
  | logOutUserProfileType
  | setUserProfileType;
