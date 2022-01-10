import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import s from './App.module.css';
import { Header } from './components/Header/Header';
import { RoutesPart } from './components/Routes/RoutesPart';
import { useAppSelector } from './hooks';
import { ReturnComponentType } from './types';

import { getIsDataLoaded, initializeAppTC } from 'store';

export const App = (): ReturnComponentType => {
  const isAuth = useAppSelector(getIsDataLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);

  return (
    <div className={s.app}>
      <div className={s.layout}>
        {isAuth ? <Header /> : <div />}
        <RoutesPart />
      </div>
    </div>
  );
};
