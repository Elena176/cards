import React from 'react';

import { Header } from '../Header';

import { PacksList } from './PacksList';
import stylePacks from './PacksManagement.module.css';

export const PacksManagement = (): any => (
  <div className={stylePacks.mainContainer}>
    <Header />
    <PacksList />
  </div>
);
