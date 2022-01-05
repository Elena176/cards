import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { AppThunk } from '../../types/AppThunkType';

import { addNewDeckType, decksAPI } from './decksApi';

import { requestStatus } from 'enum';
import { setErrorMessageNetworkAC } from 'store';
import { setAppStatusAC } from 'store/reducers';

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export type deckTemplate = {
  _id: string;
  userId?: string | undefined;
  name?: string;
  path?: string;
  cardsCount?: number;
  grade?: number;
  shots?: number;
  rating?: number;
  type?: string;
  created?: string;
  updated?: string;
  __v?: number;
  user_name?: string;
};

export type ResponseDeckType = {
  cardPacks: deckTemplate[];
  cardPacksTotalCount: number; // totalCount
  maxCardsCount: number;
  minCardsCount: number;
  page: number; // currentPage
  pageCount: number; // perPage
};
const initialState: ResponseDeckType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 10,
};

export const decksReducer = (
  state: ResponseDeckType = initialState,
  action: ActionsType,
): ResponseDeckType => {
  switch (action.type) {
    case 'FETCH_DECKS':
      // return [...state, ...action.decks];
      return { ...state, ...action.payload };
    case 'REMOVE_DECK':
      // return state.filter(deck => deck._id !== action.id);
      return {
        ...state,
        cardPacks: state.cardPacks.filter(deck => deck._id !== action.id),
      };
    case 'ADD_DECK':
      // return [{ ...action.deck }, ...state];
      return { ...state, cardPacks: [action.deck, ...state.cardPacks] };
    case 'UPDATE_DECK':
      // return state.map(deck =>
      //   deck._id === action.id ? { ...deck, name: action.title } : deck,
      // );
      // debugger;
      return {
        ...state,
        cardPacks: state.cardPacks.map(deck =>
          deck._id === action.id ? { ...deck, name: action.title } : deck,
        ),
      };
    case 'SET_CURRENT_PAGE':
      return { ...state, page: action.pageNumber };
    default:
      return state;
  }
};

// actions
export const fetchDecksAC = (payload: any) =>
  ({
    type: 'FETCH_DECKS',
    payload,
  } as const);
export const deleteDeckAC = (id: string) =>
  ({
    type: 'REMOVE_DECK',
    id,
  } as const);
export const addDeckAC = (deck: any) =>
  ({
    type: 'ADD_DECK',
    deck,
  } as const);

export const upDateDeckAC = (title: any, id: string) =>
  ({
    type: 'UPDATE_DECK',
    title,
    id,
  } as const);
export const setCurrentPageAC = (pageNumber: number) =>
  ({
    type: SET_CURRENT_PAGE,
    pageNumber,
  } as const);

type ActionsType =
  | ReturnType<typeof fetchDecksAC>
  | ReturnType<typeof deleteDeckAC>
  | ReturnType<typeof addDeckAC>
  | ReturnType<typeof upDateDeckAC>
  | ReturnType<typeof setCurrentPageAC>;

// thunk

export const setDecksTC = (): AppThunk => (dispatch: Dispatch, getState) => {
  const { page, pageCount } = getState().decks;
  dispatch(setAppStatusAC(requestStatus.loading));
  decksAPI
    .fetchDecks(page, pageCount)
    .then(res => {
      dispatch(fetchDecksAC(res.data));
      dispatch(setAppStatusAC(requestStatus.succeeded));
    })
    .catch((e: AxiosError) => {
      dispatch(setAppStatusAC(requestStatus.succeeded));
      const errorNetwork = e.response
        ? e.response.data.error
        : `${e.message}, more details in the console`;
      dispatch(setErrorMessageNetworkAC(errorNetwork));
    });
};
export const setMyDecksTC = (): AppThunk => (dispatch: Dispatch, getState) => {
  const { page, pageCount } = getState().decks;
  const { _id } = getState().profilePage.profile;
  dispatch(setAppStatusAC(requestStatus.loading));
  decksAPI
    .fetchMyDecks(page, pageCount, _id)
    .then(res => {
      dispatch(fetchDecksAC(res.data));
      dispatch(setAppStatusAC(requestStatus.succeeded));
    })
    .catch((e: AxiosError) => {
      dispatch(setAppStatusAC(requestStatus.succeeded));
      const errorNetwork = e.response
        ? e.response.data.error
        : `${e.message}, more details in the console`;
      dispatch(setErrorMessageNetworkAC(errorNetwork));
    });
};
export const removeDeckTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC(requestStatus.loading));
  decksAPI
    .removeDeck(id)
    .then(() => {
      dispatch(deleteDeckAC(id));
      dispatch(setAppStatusAC(requestStatus.succeeded));
    })
    .catch((e: AxiosError) => {
      dispatch(setAppStatusAC(requestStatus.succeeded));
      const errorNetwork = e.response
        ? e.response.data.error
        : `${e.message}, more details in the console`;
      dispatch(setErrorMessageNetworkAC(errorNetwork));
    });
};

export const addDeckTC = (dataPayload: addNewDeckType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC(requestStatus.loading));
  decksAPI
    .addNewDeck(dataPayload)
    .then(res => {
      const deck = res.data.newCardsPack;
      dispatch(addDeckAC(deck));
      dispatch(setAppStatusAC(requestStatus.succeeded));
    })
    .catch((e: AxiosError) => {
      dispatch(setAppStatusAC(requestStatus.succeeded));
      const errorNetwork = e.response
        ? e.response.data.error
        : `${e.message}, more details in the console`;
      dispatch(setErrorMessageNetworkAC(errorNetwork));
    });
};

export const upDateDeckTC = (title: any, _id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC(requestStatus.loading));
  decksAPI
    .updateDeck({ _id })
    .then(() => {
      dispatch(upDateDeckAC(title, _id));
      dispatch(setAppStatusAC(requestStatus.succeeded));
    })
    .catch((e: AxiosError) => {
      dispatch(setAppStatusAC(requestStatus.succeeded));
      const errorNetwork = e.response
        ? e.response.data.error
        : `${e.message}, more details in the console`;
      dispatch(setErrorMessageNetworkAC(errorNetwork));
    });
};
