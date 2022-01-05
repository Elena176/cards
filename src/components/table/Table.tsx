import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { PATH } from '../../enum';
import style from '../../style/Common.module.css';
import { Pagination } from '../pagination';

import {
  addDeckTC,
  deckTemplate,
  removeDeckTC,
  setCurrentPageAC,
  setDecksTC,
} from './decksTC';
import { EditableSpan } from './EditableSpan';
import styleTable from './Table.module.css';

import { Preloader, TableSidebar } from 'components';
import { useAppSelector } from 'hooks';
import { getErrorNetworkMessage, setErrorMessageNetworkAC } from 'store';
import { getStatus } from 'store/selectors';
import { ReturnComponentType } from 'types';

export const Table = (): ReturnComponentType => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const errorNetworkMessage = useAppSelector(getErrorNetworkMessage);
  const isLoading = useAppSelector(getStatus);
  const cardPacks = useAppSelector(state => state.decks.cardPacks);
  const totalCount = useAppSelector(state => state.decks.cardPacksTotalCount);
  const currentPage = useAppSelector(state => state.decks.page);
  const perPage = useAppSelector(state => state.decks.pageCount);
  // const pagesCount = Math.ceil(totalCount / perPage);

  useEffect(() => {
    dispatch(setDecksTC());
  }, [dispatch, currentPage]);

  const random = 100000;

  const onRemoveDeckClick = (id: string): void => {
    dispatch(removeDeckTC(id));
    dispatch(setErrorMessageNetworkAC(''));
  };

  const onTitleEnterChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setTitle(e.currentTarget.value);
  };
  const addButtonClick = (): void => {
    dispatch(addDeckTC({ name: title }));
    setTitle('');
  };

  /* const onClickCards = (cardsPack_id: string): void => {
    dispatch(getCardsTC(cardsPack_id));
  }; */
  // const onFilterMyPacksClick = (): void => {};

  return (
    <div className={styleTable.wrap}>
      <div className={styleTable.wrapper}>
        <TableSidebar />
        {isLoading === 'loading' ? (
          <Preloader />
        ) : (
          <div className={styleTable.rightBlock}>
            <div className={styleTable.decks}>
              <h3 style={{ fontSize: '1.1em' }}> Packs list </h3>
              <div className={styleTable.searchInputSection}>
                <input
                  className={styleTable.inputSearch}
                  id="decks"
                  placeholder="Search"
                  type="search"
                />
                <textarea
                  className={styleTable.textArea}
                  placeholder="name pack"
                  value={title}
                  onChange={onTitleEnterChange}
                />
                <button className={style.btn} onClick={addButtonClick}>
                  Add new pack
                </button>
              </div>

              <div className={styleTable.tableCommon}>
                <div className={styleTable.element}>
                  <div className={styleTable.elementPartOne} style={{ fontSize: '16px' }}>
                    Name
                  </div>
                  <div className={styleTable.elementPartTwo} style={{ fontSize: '16px' }}>
                    CardsCount
                  </div>
                  <div
                    className={styleTable.elementPartThree}
                    style={{ fontSize: '16px' }}
                  >
                    Updated
                  </div>
                  <div
                    className={styleTable.elementPartFour}
                    style={{ fontSize: '16px' }}
                  >
                    Created by
                  </div>
                </div>

                <div className={styleTable.tableRow}>
                  {errorNetworkMessage && (
                    <span style={{ color: 'red' }}> {errorNetworkMessage} </span>
                  )}
                  {cardPacks.map((cardPack: deckTemplate) => (
                    <div className={styleTable.element} key={Math.random() * random}>
                      <div className={styleTable.elementPartOne}>
                        <EditableSpan value={cardPack.name} id={cardPack._id} />
                      </div>
                      <div className={styleTable.elementPartTwo}>
                        {cardPack.cardsCount}
                      </div>
                      <div className={styleTable.elementPartThree}>
                        {cardPack.updated}
                      </div>
                      <div className={styleTable.elementPartFour}>
                        {cardPack.user_name}
                      </div>
                      <button className={styleTable.btn}>update</button>
                      <button
                        className={styleTable.btn}
                        onClick={() => onRemoveDeckClick(cardPack._id)}
                      >
                        delete
                      </button>
                      <Link to={`${PATH.CARDS}/${cardPack._id}`}>cards</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Pagination
        // className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={perPage}
        onPageChange={(page: number) => dispatch(setCurrentPageAC(page))}
      />
    </div>
  );
};
