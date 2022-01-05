import React from 'react';

import { Link } from 'react-router-dom';

import error404 from '../../assets/error404.gif';
import { ReturnComponentType } from '../../types';

import st from './Page_error_404.module.css';

export const PageError404 = (): ReturnComponentType => (
  <div>
    <div className={st.mainContainer}>
      <div className={st.imagine}>
        <img src={error404} alt="error404" className={st.page_404} />
      </div>
      <div className={st.linkContainer}>
        {' '}
        <Link to="/profile" className={st.link}>
          Back to home
        </Link>
      </div>
    </div>
  </div>
);
