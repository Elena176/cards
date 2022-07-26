import React from 'react';

import { Table } from '../table';

import stylePacks from './PacksManagement.module.css';
import { TableSidebar } from './tableSidebar';

export const PacksList = (): any => (
  <div className={stylePacks.container}>
    <TableSidebar />
    <Table />
  </div>
);
