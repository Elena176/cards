import { Nullable } from '../../types';

export type InitialStateDataType = {
  errorValidation?: Nullable<string>;
  errorNetwork?: Nullable<string>;
};

const initialState: InitialStateDataType = {
  errorValidation: null,
  errorNetwork: null,
};

export const errorForgotPasswordReducer = (
  state: InitialStateDataType = initialState,
  action: ActionTypes,
): InitialStateDataType => {
  switch (action.type) {
    case 'FORGOT_PASSWORD/SET_VALIDATION_ERROR_MESSAGE':
      return {
        ...state,
        errorValidation: action.errorValidation,
      };
    case 'FORGOT_PASSWORD/SET_NETWORK_ERROR_MESSAGE':
      return {
        ...state,
        errorNetwork: action.errorNetwork,
      };

    default:
      return state;
  }
};

export const setErrorMessagePassAC = (errorValidation: Nullable<string>) =>
  ({ type: 'FORGOT_PASSWORD/SET_VALIDATION_ERROR_MESSAGE', errorValidation } as const);

export const setErrorMessageNetworkAC = (errorNetwork: Nullable<string>) =>
  ({ type: 'FORGOT_PASSWORD/SET_NETWORK_ERROR_MESSAGE', errorNetwork } as const);

type SetErrorMessagePassType = ReturnType<typeof setErrorMessagePassAC>;
export type SetErrorMessageNetworkType = ReturnType<typeof setErrorMessageNetworkAC>;

type ActionTypes = SetErrorMessagePassType | SetErrorMessageNetworkType;
