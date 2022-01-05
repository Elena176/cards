import { useDispatch } from 'react-redux';

import { AppDispatch } from 'store/types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
