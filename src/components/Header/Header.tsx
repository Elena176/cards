import React from 'react';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { PATH } from '../../enum';
import { useAppSelector } from '../../hooks';
import { getIsDataLoaded, logOutTC } from '../../store';
import { ReturnComponentType } from '../../types';

import s from './Header.module.css';

export const Header = (): ReturnComponentType => {
  const isAuth = useAppSelector(getIsDataLoaded);
  const dispatch = useDispatch();
  const onClickLogOut = (): void => {
    dispatch(logOutTC());
  };

  return (
    <div className={s.containerHeader}>
      <div>
        <NavLink to={PATH.PACKS}> packs </NavLink>---
        <NavLink to={PATH.PROFILE}> profile </NavLink>---
        {/* <NavLink to={PATH.REGISTRATION}> register </NavLink>--- */}
      </div>
      {isAuth && (
        <button className={s.btnHeader} onClick={onClickLogOut}>
          LogOut
        </button>
      )}
    </div>
  );
};
