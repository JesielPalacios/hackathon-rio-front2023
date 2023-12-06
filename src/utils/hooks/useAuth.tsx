'use client';
import { useContext, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
// import { loginService } from '../services/users.service';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const useAuth = () => {
  const { isAuth, removeAuth } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [state, setState] = useState({ loading: false, error: false });

  const navigateTo = (to: string, useNavigate: any) => {
    if (!document?.startViewTransition) {
      useNavigate(to);
    } else {
      document.startViewTransition(() => {
        // document.documentElement.scrollTop = 0;
        useNavigate(to);
      });
    }
  };

  function CheckAuth(props: any) {
    if (isAuth) {
      return { ...props };
    } else {
      return <Navigate replace to="/login" />;
    }
  }

  return {
    logOut: removeAuth,
    loading: state.loading,
    error: state.error,
    loggedUser: {
      ...JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
        .currentUser,
    },
    navigateTo,
    CheckAuth,
  };
};
