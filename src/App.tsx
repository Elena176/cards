import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import s from './App.module.css';
import { Header } from './components/Header/Header';
import { RoutesPart } from './components/Routes/RoutesPart';
import { ReturnComponentType } from './types';

import { Preloader } from 'components';
import { useAppSelector } from 'hooks';
import { initializeAppTC } from 'store';
import { getIsInitialized } from 'store/selectors';

export const App = (): ReturnComponentType => {
  const isInitialized = useAppSelector(getIsInitialized);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAppTC());
  }, [dispatch]);
  if (!isInitialized) {
    return (
      <div className={s.preloaderWrap}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={s.app}>
      <div className={s.layout}>
        <Header />
        <RoutesPart />
      </div>
    </div>
  );
};
