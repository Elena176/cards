import { AxiosResponse } from 'axios';

import { instance } from './apiConfig';

export const cardsAPI = {
  getCards(cardsPackId: string) {
    return instance.get<ResponseType>(`cards/card?cardsPack_id=${cardsPackId}`);
  },
  deleteCard(_id: string) {
    return instance.delete<AxiosResponse<ResponseType>>(`cards/card?id=${_id}`);
  },
  addNewCard(card: AddCardType) {
    return instance.post<cardType, AxiosResponse<any>>('cards/card', { card });
  },
  updateCard(updateCard: updateCardType) {
    return instance.put<updateCardType, any>('cards/card', { updateCard });
  },
};

// types

export type AddCardType = {
  cardsPack_id: string;
  /* answer: string;
  question: string; */
  /* grade: number;
  shots: number; */
};

export type cardType = {
  _id: string;
  user_id: string;
  answer: string;
  question: string;
  cardsPack_id: string;
  grade?: number;
  shots?: number;
  rating?: number;
  type?: string;
  created?: string;
  updated?: string;
  __v?: number;
};
export type ResponseType = {
  cards: cardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export type updateCardType = {
  _id: string;
  cardsPackId: string;
};
