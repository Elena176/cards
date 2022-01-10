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
      <div style={{ display: 'flex' }}>
        <button className={s.btnHeader}>
          <NavLink style={{ textDecoration: 'none', color: 'black' }} to={PATH.PACKS}>
            Packs
          </NavLink>
        </button>
        <button className={s.btnHeader}>
          <NavLink style={{ textDecoration: 'none', color: 'black' }} to={PATH.PROFILE}>
            Profile
          </NavLink>
        </button>
      </div>
      {isAuth && (
        <button className={s.btnHeader} onClick={onClickLogOut}>
          LogOut
        </button>
      )}
    </div>
  );
};
