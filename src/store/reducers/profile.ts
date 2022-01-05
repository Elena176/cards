import { Nullable } from '../../types';

export type ProfileResponseDataType = null | {
  _id: string;
  email: string;
  name: string;
  avatar?: Nullable<string>;
  publicCardPacksCount: Nullable<number>;
  created: Date | null;
  updated: Date | null;
  isAdmin: Nullable<boolean>;
  verified: Nullable<boolean>;
  rememberMe: Nullable<boolean>;
  error?: Nullable<string>;
};

const initialState = {
  profile: {
    _id: '',
    avatar: null as string | null,
    name: '',
    email: '',
    publicCardPacksCount: null as number | null,
    created: null as Date | null,
    updated: null as Date | null,
    isAdmin: null as boolean | null,
    verified: null as boolean | null,
    rememberMe: null as boolean | null,
    error: null as string | null,
  },
};

export type InitialStateProfileType = typeof initialState;

export const profileReducer = (
  state: InitialStateProfileType = initialState,
  action: ActionTypes,
): InitialStateProfileType => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_USER_PROFILE':
      return {
        ...state,
        profile: { ...state.profile, ...action.profile },
      };
    case 'LOGOUT_USER_PROFILE':
      return {
        ...state,
        profile: {
          _id: '',
          avatar: null as string | null,
          name: '',
          email: '',
          publicCardPacksCount: null as number | null,
          created: null as Date | null,
          updated: null as Date | null,
          isAdmin: null as boolean | null,
          verified: null as boolean | null,
          rememberMe: null as boolean | null,
          error: null as string | null,
        },
      };
    default:
      return state;
  }
};

export const setUserData = (_id: string, name: string, avatar: string) =>
  ({
    type: 'SET_USER_DATA',
    payload: { _id, name, avatar },
  } as const);
export const setUserProfile = (profile: ProfileResponseDataType) =>
  ({
    type: 'SET_USER_PROFILE',
    profile,
  } as const);
export const setErrorMessage = (error: Nullable<string>) =>
  ({ type: 'SET_ERROR_MESSAGE', error } as const);
export const logOutUserProfile = (profile: ProfileResponseDataType) =>
  ({
    type: 'LOGOUT_USER_PROFILE',
    profile,
  } as const);

// type;
export type setUserProfileType = ReturnType<typeof setUserProfile>;
type setAuthUserDataType = ReturnType<typeof setUserData>;
type setErrorMessageLoginType = ReturnType<typeof setErrorMessage>;
export type logOutUserProfileType = ReturnType<typeof logOutUserProfile>;
type ActionTypes =
  | setAuthUserDataType
  | setErrorMessageLoginType
  | setUserProfileType
  | logOutUserProfileType;
