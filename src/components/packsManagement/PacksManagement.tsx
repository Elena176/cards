import React from 'react';

import { Header } from '../Header';
import { Table } from '../table';

import stylePacks from './PacksManagement.module.css';

export const PacksManagement = (): any => (
  <div className={stylePacks.mainContainer}>
    <Header />
    <Table />;
  </div>
);
