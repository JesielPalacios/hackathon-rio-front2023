'use client';
import React, { PropsWithChildren, createContext, useState } from 'react';
import { logOut } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

type AuthContextType = {
  isAuth: string | null;
  setIsAuth: React.Dispatch<React.SetStateAction<string | null>>;
  activateAuth: (token: string) => void;
  removeAuth: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
      .currentUser?.accessToken;
  });

  const dispatch = useDispatch();

  const value: AuthContextType = {
    isAuth,
    setIsAuth,
    activateAuth: (token: string) => {
      window.localStorage.setItem('token', token);
    },
    removeAuth: () => {
      setIsAuth('');
      dispatch(logOut());
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default {
  Provider,
  Consumer: AuthContext.Consumer,
};
