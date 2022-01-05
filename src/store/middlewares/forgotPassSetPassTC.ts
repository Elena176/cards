import { Dispatch } from 'redux';

import { addNewPassAPI, SetNewPassType } from '../../api/forgotPasswordApi';
import { setErrorMessageNetworkAC } from '../reducers/errorReducer';

export const forgotPassSetPassTC =
  (data: SetNewPassType, setLoadedData: any) => (dispatch: Dispatch) => {
    addNewPassAPI
      .setNewPass(data)
      .then(() => {
        setLoadedData(true);
      })
      .catch(e => {
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
