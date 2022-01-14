import React from 'react';

import { useDispatch } from 'react-redux';

import { setDecksTC, setMyDecksTC } from '../table/decksTC';

import s from './tableSidebar.module.css';

import { CustomButton } from 'components';

export const TableSidebar = React.memo(() => {
  const dispatch = useDispatch();

  const onFilterMyPacksClick = (): void => {
    dispatch(setMyDecksTC());
  };

  const onAllButtonClick = (): void => {
    dispatch(setDecksTC());
  };
  return (
    <div className={s.tableSidebar}>
      <div className={s.pickBlock}>
        <h3 className={s.header3}>Show cards packs</h3>
        <div className={s.buttonsContainer}>
          <CustomButton title="My" onClick={onFilterMyPacksClick} />
          <CustomButton title="All" onClick={onAllButtonClick} />
        </div>
      </div>
    </div>
  );
});
