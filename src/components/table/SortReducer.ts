import { deckTemplate } from './decksTC';

type ActionsType = sortStateACType;

const minusOne = -1;
const one = 1;
const zero = 0;

export const sortReducer = (
  state: deckTemplate[],
  action: ActionsType,
): deckTemplate[] => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const CompareFnUp = (a: deckTemplate, b: deckTemplate) => {
    // @ts-ignore
    if (a.updated < b.updated) {
      return minusOne;
    }
    // @ts-ignore
    if (a.updated > b.updated) {
      return one;
    }
    return zero;
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const CompareFnDown = (a: deckTemplate, b: deckTemplate) => {
    // @ts-ignore
    if (a.updated > b.updated) {
      return -minusOne;
    }
    // @ts-ignore
    if (a.updated < b.updated) {
      return one;
    }
    return zero;
  };

  switch (action.type) {
    case 'sort': {
      const stateCopy = [...state];

      return action.payload === 'up'
        ? stateCopy.sort(CompareFnUp)
        : stateCopy.sort(CompareFnDown);
    }

    default:
      return state;
  }
};

const sortStateAC = (payload: string) =>
  ({
    type: 'sort',
    payload,
  } as const);

type sortStateACType = ReturnType<typeof sortStateAC>;
