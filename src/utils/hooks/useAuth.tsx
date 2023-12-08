import React, { useCallback, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
// import { loginService } from '../services/users.service';
import { LoginAuthProps } from '../../types/types';
import {
  capitalizeFirstLetter,
  emailPatternValidation,
  getControl,
} from '../config/helpers';
import {
  logOut,
  loginFailure,
  loginStart,
  loginSuccess,
} from '../redux/userSlice';
import { loginService } from '../services/users.service';

export const useAuth = () => {
  // const { removeAuth } = useContext(AuthContext);

  const dispatch = useDispatch();

  let { isFetching, error, currentUser } = useSelector((state) => state.user);

  const isAuth = currentUser
    ? currentUser.accessToken
      ? currentUser.accessToken
      : null
    : null;

  const navigate = useNavigate();

  const [state, setState] = useState({ loading: false, error: false });

  const navigateTo = (to: string) => {
    if (!document?.startViewTransition) {
      navigate(to);
    } else {
      document.startViewTransition(() => {
        // document.documentElement.scrollTop = 0;
        navigate(to);
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

  const login = useCallback(
    ({ email, password }: LoginAuthProps) => {
      dispatch(loginStart());

      loginService({ email, password }).then(async (response: any) => {
        const data = await response.json();

        if (response.status === 200) {
          dispatch(loginSuccess(data));

          setState({ loading: false, error: false });

          currentUser &&
            toast.success(
              currentUser.gender === 'Masculino'
                ? 'Bienvenido ' +
                    capitalizeFirstLetter(
                      currentUser.firstName + ' ' + currentUser.firstSurname
                    )
                : 'Bienvenida ' +
                    capitalizeFirstLetter(
                      currentUser.firstName + ' ' + currentUser.firstSurname
                    )
            );
        } else {
          dispatch(loginFailure());

          data.message && toast.error(data.message);
          !data.message &&
            toast.error(
              'Ocurrió un error, inténtelo más tarde o comuníquese con nuestro equipo de soporte técnico.'
            );
        }
      });
    },
    [loginStart, loginSuccess, loginFailure]
  );

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const email = getControl(elements.namedItem('email'))!;
    const password = getControl(elements.namedItem('password'))!;

    email.value = 'jesielvirtualsa@gmail.com';
    password.value = '1234567890';

    if (email.value != '' && password.value != '') {
      if (emailPatternValidation(email.value)) {
        !isFetching && login({ email: email.value, password: password.value });
      } else {
        toast.error('Ingrese un correo válido');
      }
    } else {
      toast.error('Escriba el correo y la contraseña');
    }
  }

  return {
    logOut: () => dispatch(logOut()),
    loading: isFetching,
    error: error,
    loggedUser: currentUser,
    navigateTo,
    CheckAuth,
    handleLoginSubmit,
    dispatch,
    isAuth,
  };
};
