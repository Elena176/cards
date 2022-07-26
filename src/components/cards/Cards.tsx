import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Modal } from '../customComponents';
import styleModal from '../customComponents/modal/Modal.module.css';
import { Pagination } from '../pagination';
import styleTable from '../table/Table.module.css';

import { DeleteCardModal } from './DeleteCardModal';

import { cardType } from 'api/cardsApi';
import { CustomButton, CustomInput } from 'components';
import { useAppSelector } from 'hooks';
import { getErrorNetworkMessage, getStatus } from 'store';
import {
  addCardTC,
  getCardsTC,
  setCurrentPageCardsAC,
  updateCardTC,
} from 'store/reducers/cards';
import { ReturnComponentType } from 'types';

export const Cards = (): ReturnComponentType => {
  const errorNetworkMessage = useAppSelector(getErrorNetworkMessage);
  const isLoading = useAppSelector(getStatus);
  const cards = useAppSelector(state => state.cards.cards);
  const userId = useAppSelector(state => state.profilePage._id);
  const currentPage = useAppSelector(state => state.cards.page);
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount);
  const perPage = useAppSelector(state => state.cards.pageCount);

  const [isOpenFromCards, setIsOpenFromCards] = useState(false);
  const [nameQuestion, setQuestionCard] = useState('');
  const [nameAnswer, setAnswerCard] = useState('');

  const dispatch = useDispatch();

  const params = useParams<'cardsPack_id'>();
  const { cardsPack_id } = params as { cardsPack_id: string };

  /* const deleteCard = (): void => {
    setIsOpenFromCards(true);
  }; */
  /* const onClickRemoveCard = (_id: string): void => {
    dispatch(removeCardTC(_id));
    dispatch(setErrorMessageNetworkAC(''));
  }; */

  const onClickAddCard = (): void => {
    setIsOpenFromCards(true);
    // dispatch(addCardTC({ cardsPack_id }));
  };

  const addNewCardButtonClick = (): void => {
    dispatch(addCardTC({ cardsPack_id, answer: nameAnswer, question: nameQuestion }));
    setIsOpenFromCards(false);
    setQuestionCard('');
    setAnswerCard('');
  };

  const cancelButtonClick = (): void => {
    setIsOpenFromCards(false);
    setQuestionCard('');
    setAnswerCard('');
  };

  const onChangeQuestionCard = (e: any): void => {
    setQuestionCard(e.currentTarget.value);
  };

  const onChangeAnswerCard = (e: any): void => {
    setAnswerCard(e.currentTarget.value);
  };

  const onClickUpdateCard = (_id: string, question: string, answer: string): void => {
    dispatch(updateCardTC(_id, question, answer, cardsPack_id));
  };

  const resultCards = cards.map((card: cardType) => (
    <div className={styleTable.table} key={card._id}>
      <div className={styleTable.tableEl}>{card.question}</div>
      <div className={styleTable.tableElAnswer}>{card.answer}</div>
      <div className={styleTable.tableElSmall}>{card.updated}</div>
      <div className={styleTable.tableElSmall}>{card.created}</div>
      {userId === card.user_id && (
        <div style={{ display: 'flex' }}>
          <div>
            <CustomButton
              title="Del"
              onClick={() => (
                <DeleteCardModal
                  cardId={card._id}
                  isOpen={isOpenFromCards}
                  setIsOpen={setIsOpenFromCards}
                />
              )}
            />
          </div>
          <div style={{ paddingLeft: '0.3em' }}>
            <CustomButton
              title="Update"
              onClick={() => onClickUpdateCard(card._id, card.question, card.answer)}
            />
          </div>
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
          <Modal
            isOpen={isOpenFromCards}
            onClose={() => {
              setIsOpenFromCards(false);
            }}
          >
            <div className={styleModal.contentSection}>
              <p>Do you want to add new card?</p>
              <div className={styleModal.inputSection}>
                <CustomInput
                  placeholder="question"
                  typeInput="text"
                  value={nameQuestion}
                  onChange={onChangeQuestionCard}
                />
              </div>
              <div className={styleModal.inputSection}>
                <CustomInput
                  placeholder="answer"
                  typeInput="text"
                  value={nameAnswer}
                  onChange={onChangeAnswerCard}
                />
              </div>
              <div className={styleModal.btns}>
                <CustomButton title="Add new card" onClick={addNewCardButtonClick} />
                <CustomButton title="Cancel" onClick={cancelButtonClick} />
              </div>
            </div>
          </Modal>
          {/* <Modal
            title="delete"
            isOpen={isOpenFromCards}
            onClose={() => {
              setIsOpenFromCards(false);
            }}
          >
            <div className={styleModal.contentSection}>
              <p>Are you sure you want to delete the card?</p>
              <div className={styleModal.inputSection}>
                <button onClick={() => onClickRemoveCard()}>Delete</button>
                <button>Cancel</button>
              </div>
              <div className={styleModal.btns}>
                <CustomButton title="Add new card" onClick={addNewCardButtonClick} />
                <CustomButton title="Cancel" onClick={cancelButtonClick} />
              </div>
            </div>
          </Modal> */}
          <div style={{ width: '100px', margin: '10px' }}>
            <CustomButton title="Add card" onClick={onClickAddCard} />
          </div>
          {errorNetworkMessage && (
            <span style={{ color: 'red' }}> {errorNetworkMessage} </span>
          )}
          <div className={styleTable.table}>
            <div className={styleTable.tableEl}>Question</div>
            <div className={styleTable.tableEl}>Answer</div>
            <div className={styleTable.tableElSmall}>Updated</div>
            <div className={styleTable.tableElSmall}>Created by</div>
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
