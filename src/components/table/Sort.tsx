import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { RootStoreType } from '../../store';
import { ReturnComponentType } from '../../types';
import { CustomButton } from '../customButton';

import { deckTemplate } from './decksTC';
import { sortReducer } from './SortReducer';

export const Sort = (): ReturnComponentType => {
  const random = 1000000;
  const decks = useSelector<RootStoreType, deckTemplate[]>(
    state => state.decks.cardPacks,
  );

  const [dates, setDates] = useState<deckTemplate[]>(decks);

  const finalDates = dates.map((d: deckTemplate) => (
    <div
      key={Math.random() * random}
      style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}
    >
      <div> {d.updated}</div>
    </div>
  ));

  const sortUp = (): void =>
    setDates(sortReducer(decks, { type: 'sort', payload: 'up' }));
  const sortDown = (): void =>
    setDates(sortReducer(decks, { type: 'sort', payload: 'down' }));

  return (
    <div>
      {finalDates}
      <CustomButton title="sortDown" onClick={sortDown} />
      <CustomButton title="sortUp" onClick={sortUp} />
    </div>
  );
};
