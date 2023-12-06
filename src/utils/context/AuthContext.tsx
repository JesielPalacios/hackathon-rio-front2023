'use client';
import React, { PropsWithChildren, createContext, useState } from 'react';

type AuthContextType = {
  // isAuth: string | null;
  // setIsAuth: React.Dispatch<React.SetStateAction<string | null>>;
  activateAuth: (token: string) => void;
  removeAuth: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  // const [isAuth, setIsAuth] = useState(() => {
  //   return window.localStorage.getItem('token');
  // });

  const value: AuthContextType = {
    // isAuth,
    // setIsAuth,
    activateAuth: (token: string) => {
      // setIsAuth(token);
      window.localStorage.setItem('token', token);
    },
    removeAuth: () => {
      // setIsAuth('');
      window.localStorage.removeItem('user');
      return window.localStorage.removeItem('token');
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default {
  Provider,
  Consumer: AuthContext.Consumer,
};
