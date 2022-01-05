import { RootStateType } from '../../types';

export const getIsInitialized = (state: RootStateType): boolean =>
  state.app.isInitialized;
export const getStatus = (state: RootStateType): string => state.app.status;
