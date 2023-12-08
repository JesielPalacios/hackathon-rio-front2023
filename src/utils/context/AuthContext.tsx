'use client';
import React, {
  PropsWithChildren,
  createContext,
  useState
} from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/userSlice';

type AuthContextType = {
  // isAuth: string | null;
  // setIsAuth: React.Dispatch<React.SetStateAction<string | null>>;
  activateAuth: (token: string) => void;
  removeAuth: () => void;
  // loggedUser: {} | null;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  // const [isAuth, setIsAuth] = useState(() => {
    // return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
      // .currentUser;
  // });



  const dispatch = useDispatch();

  const value: AuthContextType = {
    // isAuth,
    // setIsAuth,
    activateAuth: (token: string) => {
      // window.localStorage.setItem('token', token);
    },
    removeAuth: () => {
      // setIsAuth('');
      dispatch(logOut());
    },
    // loggedUser: isAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default {
  Provider,
  Consumer: AuthContext.Consumer,
};
