import { ThunkDispatch } from 'redux-thunk';

import { setAuthLoginDataAC, setLoginData } from './login';
import { setUserProfile, setUserProfileType } from './profile';

import { authAPI } from 'api/loginApi';
import { requestStatus } from 'enum';
import { RootStoreType } from 'store';
import { Nullable, RequestStatusType } from 'types';

export const initialState: InitialStateType = {
  status: requestStatus.idle,
  error: null,
  isInitialized: false,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS':
      return { ...state, status: action.status };
    case 'APP/SET_ERROR':
      return { ...state, error: action.error };
    case 'APP/SET_IS_INITIALIZED':
      return { ...state, isInitialized: action.isInitialized };
    default:
      return { ...state };
  }
};

export const setAppErrorAC = (error: Nullable<string>) =>
  ({ type: 'APP/SET_ERROR', error } as const);
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET_STATUS', status } as const);

export const setIsInitializedAC = (isInitialized: boolean) =>
  ({ type: 'APP/SET_IS_INITIALIZED', isInitialized } as const);

export const initializeAppTC =
  () => (dispatch: ThunkDispatch<RootStoreType, undefined, ActionTypes>) => {
    authAPI
      .me()
      .then(res => {
        dispatch(setAuthLoginDataAC(true));
        dispatch(setUserProfile(res.data));
      })
      .finally(() => {
        dispatch(setIsInitializedAC(true));
      });
  };

// types

export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType;
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: Nullable<string>;
  isInitialized: boolean;
};
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type setIsInitializedType = ReturnType<typeof setIsInitializedAC>;

type ActionTypes =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | setIsInitializedType
  | setLoginData
  | setUserProfileType;
