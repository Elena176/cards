import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RootStoreType } from '../../store';
import { deckTemplate, fetchDecksAC, setMyDecksTC } from '../table/decksTC';

import s from './tableSidebar.module.css';

import { CustomButton } from 'components';
import { SuperRange } from 'components/table';

export const TableSidebar = React.memo(() => {
  const dispatch = useDispatch();
  const decks = useSelector<RootStoreType, deckTemplate[]>(
    state => state.decks.cardPacks,
  );

  const myPacks = decks.filter(deck => deck.user_name === 'samutic40@gmail.com');

  const onFilterMyPacksClick = (): void => {
    dispatch(
      fetchDecksAC({
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,
        cardPacks: myPacks,
      }),
    );
  };
  const onAllButtonClick = (): void => {
    dispatch(setMyDecksTC());
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
      <div className={s.pickBlock}>
        <div>Number of cards</div>
        <SuperRange />
      </div>
    </div>
  );
});
