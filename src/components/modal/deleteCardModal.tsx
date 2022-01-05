import React, { useState } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';

import { PATH } from '../../enum';
import { ReturnComponentType } from '../../types';

import { Modal } from './Modal';

/* type DeleteCardModalPropsType = {
  cardId: string;
}; */

export const DeleteCardModal = (): ReturnComponentType => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState<boolean>(true);
  // const {isOpen, onToggle} = useModal()

  /*  const onClickRemoveCard = (_id: string): void => {
    dispatch(removeCardTC(_id));
    dispatch(setErrorMessageNetworkAC(''));
    setIsShown(false);
  }; */
  const onClickHandleCancel = (): void => {
    navigate(PATH.CARDS);
  };
  if (isShown) {
    return <Navigate to={PATH.CARDS} />;
  }
  return (
    <>
      {/* <Button onClick={() => onToggle()} disabled={buttonDisable}>Delete</Button> */}

      <Modal open={isShown} onClick={() => setIsShown(true)}>
        <button onClick={() => {}}>Delete</button>
        <button onClick={onClickHandleCancel}>Cancel</button>
      </Modal>
    </>
  );
};

// types
