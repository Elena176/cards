/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
import React from 'react';

import './pagination.scss';

import { DOTS, usePagination } from 'hooks';
import { ReturnComponentType } from 'types';

type PaginationPropsType = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
};

export const Pagination = (props: PaginationPropsType): ReturnComponentType => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = (): void => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = (): void => {
    onPageChange(currentPage - 1);
  };
  const lastPage = paginationRange[paginationRange.length - 1];
  const ulClassName = currentPage === 1 ? 'pagination-item disabled' : 'pagination-item';

  return (
    <ul className="pagination-container">
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <li className={ulClassName} onClick={onPrevious}>
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber: string | number) => {
        const listItemClassName =
          pageNumber === currentPage ? 'pagination-item selected' : 'pagination-item';

        if (pageNumber === DOTS) {
          return (
            <li
              className="pagination-item dots"
              key={pageNumber + Math.random().toString()}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={listItemClassName}
            onClick={() => onPageChange(pageNumber as number)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={lastPage ? 'pagination-item disabled' : 'pagination-item'}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};
