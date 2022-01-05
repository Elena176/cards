import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { cardType } from '../../api/cardsApi';
import { useAppSelector } from '../../hooks';
import { getErrorNetworkMessage } from '../../store';
import { addCardTC, getCardsTC, updateCardTC } from '../../store/reducers/cards';
import { ReturnComponentType } from '../../types';
import { CustomButton } from '../customButton';
import { DeleteCardModal } from '../modal/deleteCardModal';
import style from '../table/TableGrid.module.css';

import s from './cards.module.css';

export const Cards = (): ReturnComponentType => {
  const errorNetworkMessage = useAppSelector(getErrorNetworkMessage);
  const cards = useAppSelector(state => state.cards.cards);
  const userId = useAppSelector(state => state.profilePage.profile._id);
  console.log('cards', cards);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const random = 100000;
  const params = useParams<'cardsPack_id'>();
  const { cardsPack_id } = params as { cardsPack_id: string };
  /* const onClickRemoveCard = (_id: string): void => {
    dispatch(removeCardTC(_id));
    dispatch(setErrorMessageNetworkAC(''));
  }; */
  const onClickAddCard = (): void => {
    dispatch(addCardTC({ cardsPack_id }));
  };
  const onClickUpdateCard = (_id: string, question: string, answer: string): void => {
    dispatch(updateCardTC(_id, question, answer, cardsPack_id));
  };
  /* const onClickAddCard = (): void => {
    navigate(`${PATH.CARD}/${userId}`);
  }; */

  useEffect(() => {
    dispatch(getCardsTC(cardsPack_id));
  }, [cardsPack_id]);
  return (
    <div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th>
              <button className={s.btn} onClick={onClickAddCard}>
                Add new card
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card: cardType) => (
            <tr key={card.cardsPack_id}>
              <td>{card.question}</td>
              <td>{card.answer}</td>
              <td>{card.updated}</td>
              <td>{card.created}</td>
              <td>
                {userId === card.user_id && (
                  <div className={style.btns}>
                    <button>
                      onClick=
                      <DeleteCardModal />
                    </button>
                    <CustomButton
                      title="update"
                      onClick={() =>
                        onClickUpdateCard(card._id, card.question, card.answer)
                      }
                    />
                    {/* <button>update</button>
                  <button onClick={() => onRemoveDeckClick(cardPack._id)}>delete</button> */}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {errorNetworkMessage && (
        <span style={{ color: 'red' }}> {errorNetworkMessage} </span>
      )}
    </div>
  );
};
