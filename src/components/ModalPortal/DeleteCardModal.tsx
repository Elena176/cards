import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import { setErrorMessageNetworkAC } from '../../store';
import { removeCardTC } from '../../store/reducers/cards';
import { ReturnComponentType } from '../../types';

import Modal from './ModalPortal';
import styleModal from './ModalPortal.module.css';

export const DeleteCardModal: FC<DeleteCardModalPropsType> = ({
  cardId,
  isOpen,
  setIsOpen,
}): ReturnComponentType => {
  const dispatch = useDispatch();
  // const [isOpenFromCards, setIsOpenFromCards] = useState(false);

  const onClickRemoveCard = (): void => {
    dispatch(removeCardTC(cardId));
    dispatch(setErrorMessageNetworkAC(''));
    setIsOpen(false);
  };

  const onClickHandleCancel = (): void => {
    setIsOpen(false);
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className={styleModal.contentSection}>
          <p>Are you sure you want to delete the card?</p>
          <div className={styleModal.inputSection}>
            <button onClick={onClickRemoveCard}>Delete</button>
            <button onClick={onClickHandleCancel}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// types
type DeleteCardModalPropsType = {
  cardId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
