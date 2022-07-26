import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { setDecksTC, setMyDecksTC } from '../../table/decksTC';

import { Range } from './Range';
import s from './tableSidebar.module.css';

export const TableSidebar = React.memo(() => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);
  const onFilterMyPacksClick = (): void => {
    dispatch(setMyDecksTC());
    setIsActive(true);
  };

  const onAllButtonClick = (): void => {
    dispatch(setDecksTC());
    setIsActive(false);
  };
  const colorMy = isActive ? '#9A91C8' : '#FFFFFF';
  const colorAll = isActive ? '#FFFFFF' : '#9A91C8';
  return (
    <div className={s.tableSidebar}>
      <div className={s.pickBlock}>
        <h3 className={s.header3}>Show packs cards</h3>
        <div className={s.buttonsContainer}>
          <button
            style={{ backgroundColor: colorMy }}
            className={s.button}
            onClick={onFilterMyPacksClick}
          >
            My
          </button>
          <button
            style={{ backgroundColor: colorAll }}
            className={s.button}
            onClick={onAllButtonClick}
          >
            All
          </button>
        </div>
        <h3 className={s.header3}>Numbers of cards</h3>
        <Range />
      </div>
    </div>
  );
});
