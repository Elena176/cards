import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ReturnComponentType } from '../../types';
import { ConfirmPassword, CreateNewPassword, Popup, Login, SignUp } from '../auth';
import { Cards } from '../cards';
import { PacksManagement } from '../packsManagement/PacksManagement';
import { Profile } from '../profile';

import { PATH } from 'enum';

export const RoutesPart = (): ReturnComponentType => (
  <Routes>
    <Route path={PATH.LOGIN} element={<Login />} />
    <Route path={PATH.REGISTRATION} element={<SignUp />} />
    <Route path={PATH.PROFILE} element={<Profile />} />
    {/* <Route path={PATH.PAGE_404} element={<PageError404 />} /> */}
    <Route path={PATH.CONFIRM_PASSWORD} element={<ConfirmPassword />} />
    <Route path={PATH.POPUP} element={<Popup />} />
    <Route path={PATH.CREATE_NEW_PASSWORD} element={<CreateNewPassword />}>
      <Route path=":token" element={<CreateNewPassword />} />
    </Route>
    <Route path={PATH.CARDS} element={<Cards />}>
      <Route path=":cardsPack_id" element={<Cards />} />
    </Route>
    <Route path={PATH.PACKS} element={<PacksManagement />} />
  </Routes>
);
