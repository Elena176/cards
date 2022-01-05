import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootStateType } from 'store/types';

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
