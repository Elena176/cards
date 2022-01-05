import { Dispatch } from 'redux';

import { setAppStatusAC } from '../reducers';
import { setErrorMessageNetworkAC } from '../reducers/errorReducer';

import { addNewPassAPI, AddNewPassType } from 'api/forgotPasswordApi';
import { requestStatus } from 'enum';

export const forgotPassAddEmailTC =
  (dataPayload: AddNewPassType, setShowMessage: any) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC(requestStatus.loading));
    addNewPassAPI
      .addNewPass(dataPayload)
      .then(() => {
        setShowMessage(true);
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
      });
  };
