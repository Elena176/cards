import { RootStateType } from '../../types';

export const getIsSignUp = (state: RootStateType): boolean => state.signUp.isSignUp;
