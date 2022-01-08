import { ThunkDispatch } from 'redux-thunk';

import { RootStoreType } from '../store';

import { setAppStatusAC, SetAppStatusActionType } from './appInitialized';
import { setErrorMessageNetworkAC, SetErrorMessageNetworkType } from './errorReducer';

import { authAPI, RegisterParamsType } from 'api';
import { REGISTRATION, requestStatus } from 'enum';

const initialState = {
  isSignUp: false,
};
type InitialStateType = typeof initialState;

export const signUpReducer = (
  state = initialState,
  action: SignUpActionTypes,
): InitialStateType => {
  switch (action.type) {
    case REGISTRATION.IsSuccessful: {
      return {
        ...state,
        isSignUp: action.isSignUpSuccessful,
      };
    }
    default:
      return state;
  }
};

export const toggleIsSignUpAC = (isSignUpSuccessful: boolean) =>
  ({
    type: REGISTRATION.IsSuccessful,
    isSignUpSuccessful,
  } as const);
/*
export const setErrorAC = (error: null | string) =>
  ({ type: 'RECOVERY/ERROR', payload: { error } } as const);
*/

export const signUpTC =
  (params: RegisterParamsType) =>
  (dispatch: ThunkDispatch<RootStoreType, undefined, SignUpActionTypes>) => {
    dispatch(setAppStatusAC(requestStatus.loading));
    authAPI
      .register(params)
      .then(() => {
        dispatch(toggleIsSignUpAC(true));
        dispatch(setAppStatusAC(requestStatus.succeeded));
      })
      .catch(e => {
        dispatch(setAppStatusAC(requestStatus.succeeded));
        const errorNetwork = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setErrorMessageNetworkAC(errorNetwork));
        const timeOut = 2000;
        setTimeout(() => {
          dispatch(setErrorMessageNetworkAC(''));
        }, timeOut);
      })
      .finally(() => {
        dispatch(setAppStatusAC(requestStatus.succeeded));
      });
  };
/*
export type SetErrorType = ReturnType<typeof setErrorAC>;
*/
type setSignUpType = ReturnType<typeof toggleIsSignUpAC>;
export type SignUpActionTypes =
  | setSignUpType
  | SetErrorMessageNetworkType
  | SetAppStatusActionType;
