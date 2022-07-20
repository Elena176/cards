import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { PATH } from '../../enum';
import { ReturnComponentType } from '../../types';
import { Cards } from '../cards';
import { ConfirmPassword, CreateNewPassword, Popup } from '../confirmPassword';
import { Login } from '../loginPage';
import { PacksManagement } from '../packsManagement/PacksManagement';
import { Profile } from '../profile';
import { SignUp } from '../registrations';

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
