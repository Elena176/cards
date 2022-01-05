import React from 'react';

import { Table } from './table/Table';

import { ReturnComponentType } from 'types';

export const Test = (): ReturnComponentType => (
  /*  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDecksTC());
  }, []); */
  /* const isLoading = useAppSelector(getStatus); */
  <div>
    <Table />
    {/* <Screen /> */}
  </div>
);
