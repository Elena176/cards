import React, { useEffect } from 'react';

import { CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { RoutesPart } from './components/Routes/RoutesPart';
import { useAppSelector } from './hooks';
import styleApp from './style/App.module.css';
import { ReturnComponentType } from './types';

import { getStatus, initializeAppTC } from 'store';

export const App = (): ReturnComponentType => {
  /*  const isAuth = useAppSelector(getIsDataLoaded); */
  const isInitialized = useAppSelector(getStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  if (!isInitialized) {
    return <CircularProgress />;
  }

  return (
    <div className={styleApp.app}>
      {/*  {isAuth ? <Header /> : <div style={{ minHeight: '30px' }} />} */}
      <div className={styleApp.layout}>
        <RoutesPart />
      </div>
    </div>
  );
};
