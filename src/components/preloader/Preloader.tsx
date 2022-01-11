import React from 'react';

import stylePreloader from '../../style/Preloader.module.css';
import { ReturnComponentType } from '../../types';

import preloader1 from 'assets/preloader1.gif';

export const Preloader = (): ReturnComponentType => (
  <div>
    <img className={stylePreloader.loader} src={preloader1} alt="preloader" />
  </div>
);
