import React, { ChangeEvent, useState } from 'react';

import style from './Range.module.css';

export const SuperRange = (): any => {
  const initialValue = 0;
  const [number, setNumber] = useState<number>(initialValue);
  const onChangeRange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNumber(+e.currentTarget.value);
  };
  return (
    <div>
      {number}
      <input
        type="range"
        onChange={onChangeRange}
        value={number}
        className={style.range}
      />
    </div>
  );
};
