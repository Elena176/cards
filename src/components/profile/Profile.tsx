import React, { ChangeEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import noneAvatarImage from '../../assets/avatar.png';
import { InitialStateProfileType, setUserDataAC } from '../../store/reducers/profile';

import { profileAPI } from 'api/loginApi';
import { Preloader } from 'components/preloader/Preloader';
import { PATH } from 'enum/pathes';
import { useAppSelector } from 'hooks/useAppSelector';
import { getIsDataLoaded, RootStoreType } from 'store';
import { getStatus } from 'store/selectors/app/appSelectors';
import style from 'style/Common.module.css';
import { ReturnComponentType } from 'types';

export const Profile = (): ReturnComponentType => {
  const userData = useSelector<RootStoreType, InitialStateProfileType>(
    state => state.profilePage,
  );
  const isAuth = useAppSelector(getIsDataLoaded);
  const isLoading = useAppSelector(getStatus);
  const { avatar, email } = userData;

  const [name, setName] = useState(userData.name);
  const [editMode, setEditMode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const data = {
    avatar:
      'https://tlgrm.ru/_/stickers/837/98f/83798fe7-d57e-300a-93fa-561e3027691e/2.jpg',
    name,
  };

  /*
    const onSendButtonClick = (): void => {
      profileAPI.updateProfile(data).then(res => {
        dispatch(setUserDataAC(res.data.updatedUser));
      });
    };
  */

  const onChangeHandlerName = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.currentTarget.value);
  };

  const activateEditForm = (): void => setEditMode(true);

  const hideEditForm = (): void => {
    console.log('tratata');
    profileAPI.updateProfile(data).then(res => {
      dispatch(setUserDataAC(res.data.updatedUser));
    });
    setEditMode(false);
  };
  /*  const onPhotoSelected = (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.files) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        // updateProfileTC(event.target.files[0]);
      }
    }; */

  if (!isAuth) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={style.mainContainer}>
      {isLoading === 'loading' ? (
        <Preloader />
      ) : (
        <div className={style.content}>
          <div className={style.contentWrap}>
            <h2> Profile </h2>
            <img
              alt="avatar_image"
              className={style.avatar}
              src={avatar !== null ? avatar : noneAvatarImage}
            />
            <input type="file" className={style.avatar} />
            {editMode ? (
              <input
                name="name"
                value={name}
                onChange={onChangeHandlerName}
                onBlur={hideEditForm}
              />
            ) : (
              <div style={{ display: 'flex' }}>
                <span style={{ cursor: 'pointer' }} onDoubleClick={activateEditForm}>
                  Name: {name}
                </span>
                {/*  <CustomButton title="Edit" onClick={onSendButtonClick} /> */}
              </div>
            )}
            <span> Email: {email} </span>
            <span>
              please, follow: <Link to={PATH.PACKS}> packs </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
