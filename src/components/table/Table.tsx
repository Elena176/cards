import React, { ChangeEvent, useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { PATH } from '../../enum';
import { Pagination } from '../pagination';

import {
  addDeckTC,
  deckTemplate,
  removeDeckTC,
  setCurrentPageAC,
  setDecksTC,
} from './decksTC';
import styleTable from './Table.module.css';

import { CustomButton, CustomInput, TableSidebar } from 'components/index';
import { useAppSelector } from 'hooks';
import {
  getErrorNetworkMessage,
  getIsDataLoaded,
  RootStoreType,
  setErrorMessageNetworkAC,
} from 'store';
import { InitialStateProfileType } from 'store/reducers/profile';
import { getStatus } from 'store/selectors';
import { ReturnComponentType } from 'types';

export const Table = (): ReturnComponentType => {
  const [searchName, setSearchName] = useState('');
  const isAuth = useAppSelector(getIsDataLoaded);
  const userData = useSelector<RootStoreType, InitialStateProfileType>(
    state => state.profilePage,
  );

  const dispatch = useDispatch();

  const errorNetworkMessage = useAppSelector(getErrorNetworkMessage);
  const isLoading = useAppSelector(getStatus);
  const cardPacks = useAppSelector(state => state.decks.cardPacks);
  const totalCount = useAppSelector(state => state.decks.cardPacksTotalCount);
  const currentPage = useAppSelector(state => state.decks.page);
  const perPage = useAppSelector(state => state.decks.pageCount);

  useEffect(() => {
    dispatch(setDecksTC());
  }, [dispatch, currentPage]);

  const addButtonClick = (): void => {
    dispatch(addDeckTC({}));
  };
  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchName(e.currentTarget.value);
  };
  const onRemoveDeckClick = (id: string): void => {
    dispatch(removeDeckTC(id));
    dispatch(setErrorMessageNetworkAC(''));
  };

  const resultPacks = cardPacks.map((pack: deckTemplate) => (
    <div className={styleTable.table} key={pack._id + pack.name}>
      <div className={styleTable.tableEl}>{pack.name}</div>
      <div className={styleTable.tableElSmall}>{pack.cardsCount}</div>
      <div className={styleTable.tableEl}>{pack.user_name}</div>
      <div className={styleTable.tableEl}>{pack.updated}</div>
      <div className={styleTable.tableEl} style={{ display: 'flex' }}>
        <Link to={`${PATH.CARDS}/${pack._id}`}>Learn</Link>
        {userData.name === pack.user_name && (
          <div style={{ display: 'flex' }}>
            <CustomButton title="Del" onClick={() => onRemoveDeckClick(pack._id)} />
            <CustomButton title="Update" onClick={() => {}} />
          </div>
        )}
      </div>
    </div>
  ));

  if (!isAuth) {
    return <Navigate to={PATH.PROFILE} />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {isLoading === 'loading' ? (
        <CircularProgress />
      ) : (
        <div className={styleTable.content}>
          <TableSidebar />
          <div className={styleTable.tableWrapper}>
            <h3 className={styleTable.header}> Packs list </h3>
            <div className={styleTable.inputBlock}>
              <CustomInput
                onChange={onChangeSearchName}
                value={searchName}
                placeholder="Search"
                typeInput="search"
                /* onKeyPress={onEnterPress} */
              />
              <div>
                <CustomButton title="Add new pack" onClick={addButtonClick} />
              </div>
            </div>

            <div className={styleTable.table}>
              <div className={styleTable.tableEl}>Name</div>
              <div className={styleTable.tableElSmall}>CardsCount</div>
              <div className={styleTable.tableEl}>Created by</div>
              <div className={styleTable.tableEl}>Updated</div>
              <div className={styleTable.tableEl}>Actions</div>
            </div>
            {errorNetworkMessage && (
              <span style={{ color: 'red' }}> {errorNetworkMessage} </span>
            )}
            {resultPacks}
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={perPage}
              onPageChange={(page: number) => dispatch(setCurrentPageAC(page))}
            />
          </div>
        </div>
      )}
    </div>
  );
};
