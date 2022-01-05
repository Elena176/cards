import { ChangeEvent, useCallback, useState } from 'react';

export const useInput = (initialValue: string): any => {
  const [value, setValue] = useState(initialValue);

  const handleValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [],
  );

  const resetValue = useCallback(() => setValue(initialValue), [initialValue]);

  return { value, handleValue, resetValue };
};
