import React from 'react';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { PATH } from '../../enum';
import { getIsDataLoaded, logOutTC } from '../../store';
import styleCustomButton from '../../style/CustomButton.module.css';
import { ReturnComponentType } from '../../types';

import { useAppSelector } from 'hooks';
import styleHeader from 'style/Header.module.css';

export const Header = (): ReturnComponentType => {
  const isAuth = useAppSelector(getIsDataLoaded);

  const dispatch = useDispatch();

  const onClickLogOut = (): void => {
    dispatch(logOutTC());
  };

  return (
    <div className={styleHeader.containerHeader}>
      <div style={{ display: 'flex' }}>
        <button className={styleCustomButton.button}>
          <NavLink className={styleHeader.link} to={PATH.PACKS}>
            Packs
          </NavLink>
        </button>
        <button className={styleCustomButton.button}>
          <NavLink className={styleHeader.link} to={PATH.PROFILE}>
            Profile
          </NavLink>
        </button>
      </div>
      {isAuth && (
        <button className={styleCustomButton.button} onClick={onClickLogOut}>
          LogOut
        </button>
      )}
    </div>
  );
};
