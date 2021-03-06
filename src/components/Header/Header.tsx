import React from 'react';

import { NavLink } from 'react-router-dom';

import { PATH } from '../../enum';
import { ReturnComponentType } from '../../types';
import { User } from '../customComponents/user';

import styleHeader from 'style/Header.module.css';

export const Header = (): ReturnComponentType => (
  /*  const isAuth = useAppSelector(getIsDataLoaded); */

  /*   const dispatch = useDispatch(); */

  /*  const onClickLogOut = (): void => {
    dispatch(logOutTC());
  }; */

  <div className={styleHeader.mainContainer}>
    <div className={styleHeader.container}>
      <NavLink className={styleHeader.packsList} to={PATH.PACKS}>
        <span>PacksList</span>
      </NavLink>
      <NavLink
        className={`${styleHeader.packsList} ${styleHeader.packsListProfile}`}
        to={PATH.PROFILE}
      >
        <User size="15px" color="#2D2E46" />
        <span>Profile</span>
      </NavLink>
    </div>
    {/*  {isAuth && (
        <button className={styleCustomButton.button} onClick={onClickLogOut}>
          LogOut
        </button>
      )} */}
  </div>
);
