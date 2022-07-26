import React from 'react';

import { Table } from '../table';
import { TableSidebar } from '../tableSidebar';

import stylePacks from './PacksManagement.module.css';

export const PacksList = (): any => (
  <div className={stylePacks.container}>
    <TableSidebar />
    <Table />
  </div>
);
