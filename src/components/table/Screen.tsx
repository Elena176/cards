import React from 'react';

import { useAppSelector } from '../../hooks';
import { getStatus } from '../../store';
import { ReturnComponentType } from '../../types';
import { Preloader } from '../preloader';
import { TableSidebar } from '../tableSidebar';

import { Search } from './Search';
import { TableGrid } from './TableGrid';
import style from './TableGrid.module.css';

export const Screen = (): ReturnComponentType => {
  const isLoading = useAppSelector(getStatus);
  return (
    <div>
      {isLoading === 'loading' ? (
        <Preloader />
      ) : (
        <div className={style.wrapper}>
          <TableSidebar />
          <div>
            <h3 className={style.header3}> Packs list </h3>
            <Search />
            <TableGrid />
          </div>
        </div>
      )}
    </div>
  );
};
