import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootReducerType } from '../store/types';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootReducerType,
  unknown,
  AnyAction
>;
