import React, { ChangeEvent, useState } from 'react';

import style from './Range.module.css';

export const Range = (): any => {
  const initialValue = 0;
  const allValue = 100;
  const max = 100;
  const [value, setValue] = useState<number>(initialValue);
  const onChangeRange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(+e.currentTarget.value);
  };
  const backgroundSize = `${
    ((value - initialValue) * allValue) / (max - initialValue)
  }% 100%`;

  return (
    <div className={style.container}>
      <div className={style.value}>{value}</div>
      <input
        style={{ backgroundSize }}
        type="range"
        onChange={onChangeRange}
        value={value}
        className={style.range}
      />
    </div>
  );
};
