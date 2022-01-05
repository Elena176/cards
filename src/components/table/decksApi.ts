import { AxiosResponse } from 'axios';

import { ResponseDeckType } from './decksTC';

import { instance } from 'api/apiConfig';

export type addNewDeckType = {
  name: string;
};

export type updateDeckType = {
  _id: string;
};

export const decksAPI = {
  fetchDecks(page: number, pageCount: number) {
    return instance.get<any, AxiosResponse<ResponseDeckType>>('cards/pack', {
      params: { page, pageCount },
    });
  },
  fetchMyDecks(page: number, pageCount: number, userId: string) {
    return instance.get<any, AxiosResponse<ResponseDeckType>>('cards/pack', {
      params: { page, pageCount, userId },
    });
  },
  addNewDeck(cardsPack: addNewDeckType) {
    return instance.post<addNewDeckType, AxiosResponse<any>>('cards/pack', { cardsPack });
  },

  removeDeck(id: string) {
    return instance.delete<string, any>(`cards/pack/?id=${id}`);
  },

  updateDeck(cardsPack: updateDeckType) {
    return instance.put<string, any>('cards/pack', { cardsPack });
  },
};
