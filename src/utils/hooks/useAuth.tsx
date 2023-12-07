import React, { useContext, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import { loginService } from '../services/users.service';
import {
  capitalizeFirstLetter,
  emailPatternValidation,
  getControl,
} from '../config/helpers';
import { loginService } from '../services/users.service';
import { loginFailure, loginSuccess } from '../redux/userSlice';
import { LoginAuthProps } from '../../types/types';

export const useAuth = () => {
  const { isAuth, removeAuth } = useContext(AuthContext);
  console.log('isAuth', isAuth);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

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

  const loggedUser = {
    ...JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
      .currentUser,
  };

  function CheckAuth(props: any) {
    if (loggedUser.accessToken) {
      return { ...props };
    } else {
      return <Navigate replace to="/login" />;
    }
  }

  const login = useCallback(({ email, password }: LoginAuthProps) => {
    loginService({ email, password }).then(async (response: any) => {
      const data = await response.json();

      if (response.status === 200) {
        dispatch(loginSuccess(data));

        setState({ loading: false, error: false });

        console.log('loggedUser.gender', loggedUser.gender);
        toast.success(
          loggedUser.gender === 'Masculino'
            ? 'Bienvenido ' +
                capitalizeFirstLetter(
                  loggedUser.firstName + ' ' + loggedUser.firstSurname
                )
            : 'Bienvenida ' +
                capitalizeFirstLetter(
                  loggedUser.firstName + ' ' + loggedUser.firstSurname
                )
        );
      } else {
        dispatch(loginFailure());

        toast.error(data.message);
      }
    });
  }, []);

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const email = getControl(elements.namedItem('email'))!;
    const password = getControl(elements.namedItem('password'))!;

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
    logOut: removeAuth,
    loading: isFetching,
    error: error,
    loggedUser,
    isAuth,
    navigateTo,
    CheckAuth,
    handleLoginSubmit,
    dispatch,
  };
};
