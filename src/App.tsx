import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { Header } from './components';
import { RoutesPart } from './components/Routes/RoutesPart';
import { useAppSelector } from './hooks';
import styleApp from './style/App.module.css';
import { ReturnComponentType } from './types';

import { getIsDataLoaded, initializeAppTC } from 'store';

export const App = (): ReturnComponentType => {
  const isAuth = useAppSelector(getIsDataLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  return (
    <div className={styleApp.app}>
      <div className={styleApp.layout}>
        {isAuth ? <Header /> : <div />}
        <RoutesPart />
      </div>
    </div>
  );
};
