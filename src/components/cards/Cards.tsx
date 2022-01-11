import React, { useEffect } from 'react';

import { CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { cardType } from '../../api/cardsApi';
import { useAppSelector } from '../../hooks';
import { getErrorNetworkMessage, getStatus, setErrorMessageNetworkAC } from '../../store';
import {
  addCardTC,
  getCardsTC,
  removeCardTC,
  setCurrentPageCardsAC,
  updateCardTC,
} from '../../store/reducers/cards';
import { ReturnComponentType } from '../../types';
import { CustomButton } from '../customButton';
import { Pagination } from '../pagination';
import styleTable from '../table/Table.module.css';

export const Cards = (): ReturnComponentType => {
  const errorNetworkMessage = useAppSelector(getErrorNetworkMessage);
  const isLoading = useAppSelector(getStatus);
  const cards = useAppSelector(state => state.cards.cards);
  const userId = useAppSelector(state => state.profilePage._id);
  const currentPage = useAppSelector(state => state.cards.page);
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount);
  const perPage = useAppSelector(state => state.cards.pageCount);

  const dispatch = useDispatch();

  const params = useParams<'cardsPack_id'>();
  const { cardsPack_id } = params as { cardsPack_id: string };

  const onClickRemoveCard = (_id: string): void => {
    dispatch(removeCardTC(_id));
    dispatch(setErrorMessageNetworkAC(''));
  };

  const onClickAddCard = (): void => {
    dispatch(addCardTC({ cardsPack_id }));
  };

  const onClickUpdateCard = (_id: string, question: string, answer: string): void => {
    dispatch(updateCardTC(_id, question, answer, cardsPack_id));
  };

  const resultCards = cards.map((card: cardType) => (
    <div className={styleTable.table} key={card._id}>
      <div className={styleTable.tableEl}>{card.question}</div>
      <div className={styleTable.tableElSmall}>{card.answer}</div>
      <div className={styleTable.tableEl}>{card.updated}</div>
      <div className={styleTable.tableEl}>{card.created}</div>
      {userId === card.user_id && (
        <div style={{ display: 'flex' }}>
          <CustomButton title="Del" onClick={() => onClickRemoveCard(card._id)} />
          <CustomButton
            title="Update"
            onClick={() => onClickUpdateCard(card._id, card.question, card.answer)}
          />
        </div>
      )}
    </div>
  ));

  useEffect(() => {
    dispatch(getCardsTC(cardsPack_id));
  }, [dispatch, cardsPack_id, currentPage]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {isLoading === 'loading' ? (
        <CircularProgress />
      ) : (
        <div>
          <div style={{ width: '100px', margin: '10px' }}>
            <CustomButton title="Add card" onClick={onClickAddCard} />
          </div>
          {errorNetworkMessage && (
            <span style={{ color: 'red' }}> {errorNetworkMessage} </span>
          )}
          <div className={styleTable.table}>
            <div className={styleTable.tableEl}>Name</div>
            <div className={styleTable.tableElSmall}>CardsCount</div>
            <div className={styleTable.tableEl}>Created by</div>
            <div className={styleTable.tableEl}>Updated</div>
            <div className={styleTable.tableEl}>Actions</div>
          </div>
          {resultCards}
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={perPage}
            onPageChange={(curPage: number) => dispatch(setCurrentPageCardsAC(curPage))}
          />
        </div>
      )}
    </div>
  );
};
