export const createRangedArray = (start: number, end: number): number[] => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};
