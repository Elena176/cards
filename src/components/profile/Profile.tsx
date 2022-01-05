import React, { ChangeEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import noneAvatarImage from '../../assets/avatar.png';
import { InitialStateProfileType } from '../../store/reducers/profile';
import { CustomButton } from '../customButton';

import { profileAPI } from 'api/loginApi';
import { Preloader } from 'components/preloader/Preloader';
import { PATH } from 'enum/pathes';
import { useAppSelector } from 'hooks/useAppSelector';
import { getIsDataLoaded, RootStoreType } from 'store';
import { setUserDataAC } from 'store/reducers/login';
import { getStatus } from 'store/selectors/app/appSelectors';
import style from 'style/Common.module.css';
import { ReturnComponentType } from 'types';

export const Profile = (): ReturnComponentType => {
  const userData = useSelector<RootStoreType, InitialStateProfileType>(
    state => state.profilePage,
  );
  const isAuth = useAppSelector(getIsDataLoaded);
  const isLoading = useAppSelector(getStatus);
  const { avatar } = userData.profile;

  const [name, setName] = useState(userData.profile.name);
  const [email, setEmail] = useState(userData.profile.email);
  const [editMode, setEditMode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const data = {
    avatar:
      'https://tlgrm.ru/_/stickers/837/98f/83798fe7-d57e-300a-93fa-561e3027691e/2.jpg',
    name,
    email,
  };

  const onSendButtonClick = (): void => {
    profileAPI.updateProfile(data).then(res => {
      dispatch(setUserDataAC(res.data.updatedUser));
    });
  };

  const onChangeHandlerName = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.currentTarget.value);
  };
  const onChangeHandlerEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.currentTarget.value);
  };

  const activateEditForm = (): void => setEditMode(true);
  const hideEditForm = (): void => {
    setEditMode(false);
  };
  const onPhotoSelected = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      // updateProfileTC(event.target.files[0]);
    }
  };

  if (!isAuth) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={style.mainContainer}>
      {isLoading === 'loading' ? (
        <Preloader />
      ) : (
        <div className={style.content}>
          <h2> Profile </h2>
          <img
            alt="avatar_image"
            className={style.avatar}
            src={avatar !== null ? avatar : noneAvatarImage}
          />
          <input type="file" className={style.avatar} onChange={onPhotoSelected} />
          <br />
          {editMode ? (
            <input
              name="name"
              value={name}
              onChange={onChangeHandlerName}
              onBlur={hideEditForm}
            />
          ) : (
            <span onDoubleClick={activateEditForm}> userName: {name}</span>
          )}
          <br />
          {editMode ? (
            <input
              name="email"
              value={email}
              onChange={onChangeHandlerEmail}
              onBlur={hideEditForm}
            />
          ) : (
            <span onDoubleClick={activateEditForm}> userEmail: {email}</span>
          )}
          <br />

          <div>
            please, follow: <Link to={PATH.PACKS}> packs </Link>
          </div>
          <div>
            <CustomButton title="Send" onClick={onSendButtonClick} />
            <span>
              change <br /> your profile
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
