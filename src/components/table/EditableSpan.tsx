import React, { ChangeEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import { upDateDeckTC } from './decksTC';

type EditableSpanPropsType = {
  value: any;
  id: string;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.value);

  const dispatch = useDispatch();

  const activateEditMode = (): void => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = (): void => {
    dispatch(upDateDeckTC(title, props.id));
    setEditMode(false);
  };
  const changeTitle = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    // eslint-disable-next-line jsx-a11y/no-autofocus
    <textarea value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
});
