import { AxiosError } from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { AddCardType, cardsAPI, cardType, ResponseType } from '../../api/cardsApi';
import { requestStatus } from '../../enum';
import { RootStoreType } from '../store';

import { setAppStatusAC, SetAppStatusActionType } from './appInitialized';
import { setErrorMessageNetworkAC, SetErrorMessageNetworkType } from './errorReducer';

type initStateType = {
  cards: cardType[];
  answer: string;
  question: string;
  cardsTotalCount: number;
  grade: number;
  shots: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};
const initialState: initStateType = {
  cards: [],
  answer: '',
  question: '',
  cardsTotalCount: 0,
  grade: 5,
  shots: 1,
  maxGrade: 5,
  minGrade: 3,
  page: 1,
  pageCount: 10,
  packUserId: '',
};
export const cardReducer = (
  state: initStateType = initialState,
  action: ActionTypesCards,
): initStateType => {
  switch (action.type) {
    case 'CARDS/SET_DATA_CARDS':
      return { ...state, ...action.data };
    case 'CARDS/REMOVE_CARD':
      return { ...state, cards: state.cards.filter(c => c._id !== action._id) };
    case 'CARDS/ADD_CARD':
      return { ...state, cards: [action.card, ...state.cards] };
    case 'CARDS/UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map(c =>
          c._id === action._id
            ? {
                ...c,
                question: action.question,
                answer: action.answer,
              }
            : c,
        ),
      };
    default:
      return state;
  }
};

export const setCardsAC = (data: ResponseType) =>
  ({ type: 'CARDS/SET_DATA_CARDS', data } as const);

export const removeCardAC = (_id: string) =>
  ({ type: 'CARDS/REMOVE_CARD', _id } as const);

export const addCardAC = (card: cardType) => ({ type: 'CARDS/ADD_CARD', card } as const);

export const updateCardAC = (_id: string, question: string, answer: string) =>
  ({
    type: 'CARDS/UPDATE_CARD',
    _id,
    question,
    answer,
  } as const);

export const getCardsTC =
  (cardsPackId: string) =>
  (dispatch: ThunkDispatch<RootStoreType, undefined, ActionTypesCards>) => {
    dispatch(setAppStatusAC(requestStatus.loading));
    cardsAPI
      .getCards(cardsPackId)
      .then(res => {
        dispatch(setCardsAC(res.data));
        dispatch(setAppStatusAC(requestStatus.succeeded));
      })
      .catch(e => {
        const errorNetwork = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setErrorMessageNetworkAC(errorNetwork));
        const timeOut = 3000;
        setTimeout(() => {
          dispatch(setErrorMessageNetworkAC(''));
        }, timeOut);
      })
      .finally(() => {
        dispatch(setAppStatusAC(requestStatus.succeeded));
      });
  };

export const removeCardTC =
  (_id: string) =>
  (dispatch: ThunkDispatch<RootStoreType, undefined, ActionTypesCards>) => {
    dispatch(setAppStatusAC(requestStatus.loading));
    cardsAPI
      .deleteCard(_id)
      .then(() => {
        dispatch(removeCardAC(_id));
        dispatch(setAppStatusAC(requestStatus.succeeded));
      })
      .catch(e => {
        const errorNetwork = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setErrorMessageNetworkAC(errorNetwork));
      });
  };

/* export const addCardTC =
  (cardsPackId: string) =>
  (dispatch: ThunkDispatch<RootStoreType, undefined, ActionTypesCards>) => {
    dispatch(setAppStatusAC(requestStatus.loading));
    cardsAPI.getCards(cardsPackId).then(res => {
      dispatch(setCardsAC(res.data));
      dispatch(setAppStatusAC(requestStatus.succeeded));
    });
  }; */
export const addCardTC =
  (payload: AddCardType) =>
  (dispatch: ThunkDispatch<RootStoreType, undefined, ActionTypesCards>) => {
    dispatch(setAppStatusAC(requestStatus.loading));
    cardsAPI
      .addNewCard(payload)
      .then(res => {
        const newCard = res.data;
        dispatch(addCardAC(newCard));
        dispatch(setAppStatusAC(requestStatus.succeeded));
      })
      .catch((e: AxiosError) => {
        const errorNetwork = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setErrorMessageNetworkAC(errorNetwork));
      })
      .finally(() => {
        dispatch(setAppStatusAC(requestStatus.succeeded));
      });
  };

export const updateCardTC =
  (_id: string, question: string, answer: string, cardsPackId: string) =>
  (dispatch: ThunkDispatch<RootStoreType, undefined, ActionTypesCards>) => {
    dispatch(setAppStatusAC(requestStatus.loading));
    cardsAPI.updateCard({ _id, cardsPackId }).then(() => {
      dispatch(updateCardAC(_id, question, answer));
      dispatch(setAppStatusAC(requestStatus.succeeded));
    });
  };

// types
export type getCardsType = ReturnType<typeof setCardsAC>;
export type removeCardType = ReturnType<typeof removeCardAC>;
export type addCardType = ReturnType<typeof addCardAC>;
export type updateCardType = ReturnType<typeof updateCardAC>;

export type ActionTypesCards =
  | getCardsType
  | SetAppStatusActionType
  | removeCardType
  | SetErrorMessageNetworkType
  | addCardType
  | updateCardType;
