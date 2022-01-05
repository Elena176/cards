import React, { ChangeEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RootStoreType, setErrorMessagePassAC } from '../../store';
import { ReturnComponentType } from '../../types';
import { CustomButton } from '../customButton';

import { addDeckTC, deckTemplate, fetchDecksAC } from './decksTC';
import style from './TableGrid.module.css';

export const Search = (): ReturnComponentType => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');

  const decks = useSelector<RootStoreType, deckTemplate[]>(
    state => state.decks.cardPacks,
  );

  const random = 100000;
  const enter = 13;
  const timeOut = 2000;
  const chosenPacks = decks.filter(deck => deck.name === name);

  const dispatch = useDispatch();

  const onTitleEnterChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };
  const addButtonClick = (): void => {
    dispatch(addDeckTC({ name: title }));
    setTitle('');
  };
  const onKeyPressAddHandler = (e: any): void => {
    if (e.charCode === enter) {
      dispatch(addDeckTC({ name: title }));
      setTitle('');
    }
  };
  const onDoubleClickAddHandler = (): void => {
    dispatch(
      fetchDecksAC({
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 0,
        cardPacks: chosenPacks,
      }),
    );
  };
  const onChangeSearch = (e: any): void => {
    setName(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: any): void => {
    if (e.charCode === enter) {
      dispatch(
        fetchDecksAC({
          cardPacksTotalCount: 0,
          maxCardsCount: 0,
          minCardsCount: 0,
          page: 0,
          pageCount: 0,
          cardPacks: chosenPacks,
        }),
      );
      setName('');
    } else {
      dispatch(setErrorMessagePassAC('Press only ENTER'));
      setTimeout(() => {
        dispatch(setErrorMessagePassAC(''));
      }, timeOut);
    }
  };

  return (
    <div className={style.rightBlock}>
      <div className={style.searchInputSection}>
        <input
          className={style.inputSearch}
          id="decks"
          placeholder="Search"
          type="search"
          list="packs"
          onKeyPress={onKeyPressHandler}
          onChange={onChangeSearch}
        />
        <input
          className={style.textArea}
          placeholder="name pack"
          value={title}
          onChange={onTitleEnterChange}
          onKeyPress={onKeyPressAddHandler}
        />
        <datalist id="packs" onDoubleClick={onDoubleClickAddHandler}>
          {/*  <select> */}
          {decks.map((deck: deckTemplate) => (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <option key={Math.random() * random} value={deck.name} />
          ))}
          {/*  </select> */}
        </datalist>

        <CustomButton title=" Add new pack" onClick={addButtonClick} />
      </div>
    </div>
  );
};
