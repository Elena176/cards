import { AxiosResponse } from 'axios';

import { ResponseDeckType } from './decksTC';

import { instance } from 'api/apiConfig';

export type addNewDeckType = {
  name?: string;
};

export type updateDeckType = {
  _id: string;
};

export type dataRequestType = {
  page?: number;
  pageCount?: number;
  min?: number;
  max?: number;
  sortPacks?: string;
  user_id?: string;
  packName?: string;
};

export const decksAPI = {
  fetchDecks(page: number, pageCount: number) {
    return instance.get<any, AxiosResponse<ResponseDeckType>>('cards/pack', {
      params: { page, pageCount },
    });
  },

  getPacks(data: dataRequestType) {
    return instance.get<any, AxiosResponse<any>>('cards/pack', { params: { ...data } });
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
