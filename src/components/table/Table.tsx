import React, { ChangeEvent, useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { PATH, requestStatus } from '../../enum';
import styleModal from '../ModalPortal/ModalPortal.module.css';
import { Pagination } from '../pagination';

import {
  addDeckTC,
  deckTemplate,
  removeDeckTC,
  searchPacksTC,
  setCurrentPageAC,
  setDecksTC,
} from './decksTC';
import styleTable from './Table.module.css';

import { CustomButton, CustomInput, TableSidebar } from 'components/index';
import Modal from 'components/ModalPortal/ModalPortal';
import { useAppSelector } from 'hooks';
import { getErrorNetworkMessage, getIsDataLoaded, setErrorMessageNetworkAC } from 'store';
import { getStatus } from 'store/selectors';
import { ReturnComponentType } from 'types';

const enter = 13;

export const Table = (): ReturnComponentType => {
  const [searchName, setSearchName] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const isAuth = useAppSelector(getIsDataLoaded);
  const userId = useAppSelector(state => state.profilePage._id);

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
    setIsOpen(true);
  };

  const addButtonClickFromModal = (): void => {
    dispatch(addDeckTC({ name: title }));
    setIsOpen(false);
    setTitle('');
  };

  const cancelButtonClickFromModal = (): void => {
    setIsOpen(false);
    setTitle('');
  };
  const onChangeTitle = (e: any): void => {
    setTitle(e.currentTarget.value);
  };

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchName(e.currentTarget.value);
  };
  const onRemoveDeckClick = (id: string): void => {
    dispatch(removeDeckTC(id));
    dispatch(setErrorMessageNetworkAC(''));
  };

  const onEnterPress = (e: any): void => {
    if (e.charCode === enter) {
      dispatch(searchPacksTC(searchName));
      setSearchName('');
    }
  };

  const resultPacks = cardPacks.map((pack: deckTemplate) => (
    <div className={styleTable.table} key={pack._id + pack.name}>
      <div className={styleTable.tableEl}>{pack.name}</div>
      <div className={styleTable.tableElSmall}>{pack.cardsCount}</div>
      <div className={styleTable.tableElSmall}>{pack.user_name}</div>
      <div className={styleTable.tableElSmall}>{pack.updated}</div>
      <div className={styleTable.tableEl} style={{ display: 'flex' }}>
        <Link to={`${PATH.CARDS}/${pack._id}`}>Learn</Link>
        {userId === pack.user_id && (
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

  // @ts-ignore
  return (
    <div className={styleTable.container}>
      {isLoading === requestStatus.loading ? (
        <CircularProgress />
      ) : (
        <div>
          <div className={styleTable.head}>
            <h3> Packs list </h3>
            {/* search input */}
            <CustomInput
              onChange={onChangeSearchName}
              value={searchName}
              placeholder="Search"
              typeInput="search"
              onKeyPress={onEnterPress}
            />
            <button onClick={addButtonClick}>Add new pack</button>
          </div>
          <div className={styleTable.tableWrapper}>
            <TableSidebar />
            <div className={styleTable.tableContainer}>{resultPacks}</div>
          </div>

          {/*  <div className={styleTable.table}>
              <div className={styleTable.tableEl}>Name</div>
              <div className={styleTable.tableElSmall}>CardsCount</div>
              <div className={styleTable.tableElSmall}>Created by</div>
              <div className={styleTable.tableElSmall}>Updated</div>
              <div className={styleTable.tableEl}>Actions</div>
            </div> */}

          {errorNetworkMessage && (
            <span style={{ color: 'red' }}> {errorNetworkMessage} </span>
          )}
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={perPage}
            onPageChange={(page: number) => dispatch(setCurrentPageAC(page))}
          />

          <Modal
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <div className={styleModal.contentSection}>
              <p>Do you want to add new pack?</p>
              <div className={styleModal.inputSection}>
                <CustomInput
                  placeholder="title new pack"
                  typeInput="text"
                  value={title}
                  onChange={onChangeTitle}
                />
              </div>
              <div className={styleModal.btns}>
                <div style={{ paddingRight: '0.3em' }}>
                  <CustomButton title="Add new pack" onClick={addButtonClickFromModal} />
                </div>
                <div>
                  <CustomButton title="Cancel" onClick={cancelButtonClickFromModal} />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
