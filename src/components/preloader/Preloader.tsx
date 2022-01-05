import React from 'react';

import { ReturnComponentType } from '../../types';

import style from './Preloader.module.css';

import preloader1 from 'assets/preloader1.gif';

export const Preloader = (): ReturnComponentType => (
  <div>
    <img className={style.loader} src={preloader1} alt="preloader" />
  </div>
);
