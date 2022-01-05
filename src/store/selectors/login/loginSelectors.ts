import { RootStateType } from '../../types';

export const getIsDataLoaded = (state: RootStateType): boolean => state.login.isAuth;
export const getErrorMessage = (state: RootStateType): any => state.login.error;
