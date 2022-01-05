export type ProfileResponseDataType = null | {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  /* created: Date;
  updated: Date; */
  isAdmin: boolean;
  rememberMe: boolean;
  error?: string;
};

const initialState = {
  _id: '',
  avatar: '',
  name: '',
  email: '',
  publicCardPacksCount: 0,
  /* created: '',
  updated: '', */
  isAdmin: false,
  rememberMe: false,
  error: '',
};

export type InitialStateProfileType = typeof initialState;

export const profileReducer = (
  state: InitialStateProfileType = initialState,
  action: ActionProfileTypes,
): InitialStateProfileType => {
  switch (action.type) {
    /* case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
      }; */
    case 'PROFILE/SET_USER_PROFILE':
      return {
        ...state,
        ...action.profile,
      };
    default:
      return state;
  }
};

/* export const setUserData = (_id: string, name: string, avatar: string) =>
  ({
    type: 'SET_USER_DATA',
    payload: { _id, name, avatar },
  } as const); */
export const setUserProfileAC = (profile: ProfileResponseDataType) =>
  ({
    type: 'PROFILE/SET_USER_PROFILE',
    profile,
  } as const);
/* export const setErrorMessage = (error: Nullable<string>) =>
  ({ type: 'SET_ERROR_MESSAGE', error } as const); */

export const setUserDataAC = (user: ProfileResponseDataType) =>
  ({ type: 'PROFILE/SET_USER_DATA', user } as const);

// types
export type setUserProfileType = ReturnType<typeof setUserProfileAC>;
/* type setAuthUserDataType = ReturnType<typeof setUserData>; */
/* type setErrorMessageLoginType = ReturnType<typeof setErrorMessage>; */
type ActionProfileTypes = setUserProfileType;
/*  | setAuthUserDataType */
/* setErrorMessageLoginType | */
