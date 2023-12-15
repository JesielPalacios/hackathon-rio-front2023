import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { loginService } from '../services/users.service';
import Select from 'react-select';
import { LoginAuthProps } from '../../types/types';
import {
  capitalizeFirstLetter,
  emailPatternValidation,
  getControl,
} from '../config/helpers';
import { customStyles } from '../constants';
import {
  logOut,
  loginFailure,
  loginStart,
  loginSuccess,
  registerUserData,
} from '../redux/userSlice';
import { loginService } from '../services/users.service';
import { useMovie } from './useMovie';
import { useTranslation } from 'react-i18next';

export const useAuth = () => {
  // const { removeAuth } = useContext(AuthContext);

  const dispatch = useDispatch();

  const { isFetching, error, currentUser, newUserRegister } = useSelector(
    (state) => state.user
  );

  const { moviesGenres, loadingMovies, errorMovies } = useMovie();

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

  const registerFormInputs = [
    // {
    //   name: 'firstName',
    //   label: 'Primer nombre',
    //   inputProps: {
    //     type: 'text',
    //     placeholder: 'Primer nombre aquí.',
    //     required: true,
    //   },
    // },
    {
      name: 'secondName',
      label: 'Segundo nombre',
      inputProps: {
        type: 'text',
        placeholder: 'Segundo nombre aquí.',
      },
    },
    {
      name: 'firstSurname',
      label: 'Primer apellido',
      inputProps: {
        type: 'text',
        placeholder: 'Primer apellido aquí.',
        required: true,
      },
    },
    {
      name: 'secondSurname',
      label: 'Segundo apellido',
      inputProps: {
        type: 'text',
        placeholder: 'Segundo apellido aquí.',
      },
    },
    {
      name: 'email',
      label: 'Correo electrónico',
      required: 'required',
      inputProps: {
        type: 'email',
        placeholder: 'Correo electrónico aquí.',
        required: true,
      },
    },
    {
      name: 'password',
      label: 'Contraseña',
      required: 'required',
      inputProps: {
        type: 'password',
        placeholder: 'Contraseña aquí.',
        required: true,
      },
    },

    {
      id: 'preferences',
      label: 'Preferencias',
      required: true,
      select: true,
      element: (
        <Select
          inputId="preferences"
          required
          placeholder={'Seleccione sus preferencias aquí.'}
          formatCreateLabel={(props) => {
            return 'Seleccionar: ' + props;
          }}
          isClearable={true}
          isDisabled={loadingMovies}
          isMulti
          // hideSelectedOptions={true}
          styles={customStyles}
          onChange={(data: { id: number }) => {
            data
              ? dispatch(
                  registerUserData({
                    preferences: data,
                  })
                )
              : dispatch(
                  registerUserData({
                    preferences: undefined,
                  })
                );
          }}
          options={moviesGenres.map(({ name, id }) => ({
            label: name,
            value: name,
            id,
          }))}
          // value={
          //   loadingMovies
          //     ? {
          //         label: 'Cargando...',
          //         value: 'Cargando...',
          //       }
          //     : newUserRegister.preferences && {
          //         label: newUserRegister.preferences
          //           ? newUserRegister.preferences
          //           : '',
          //         value: newUserRegister.preferences
          //           ? newUserRegister.preferences
          //           : '',
          //       }
          // }
          noOptionsMessage={() => 'No se encontró el género.'}
          // {...disableEditing(loading)}
        />
      ),
    },
  ];

  function handleRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const firstName = getControl(elements.namedItem('firstName'))!.value;
    const secondName = getControl(elements.namedItem('secondName'))!.value;
    const firstSurname = getControl(elements.namedItem('firstSurname'))!.value;
    const secondSurname = getControl(
      elements.namedItem('secondSurname')
    )!.value;
    const email = getControl(elements.namedItem('email'))!.value;
    const password = getControl(elements.namedItem('password'))!.value;

    dispatch(
      registerUserData({
        firstName,
        secondName,
        firstSurname,
        secondSurname,
        email,
        password,
      })
    );

    console.log('newUserRegister', newUserRegister);

    // email.value = 'jesielvirtualsa@gmail.com';
    // password.value = '1234567890';

    // if (email.value != '' && password.value != '') {
    //   if (emailPatternValidation(email.value)) {
    //     !isFetching && login({ email: email.value, password: password.value });
    //   } else {
    //     toast.error('Ingrese un correo válido');
    //   }
    // } else {
    //   toast.error('Escriba el correo y la contraseña');
    // }
  }

  return {
    logOut: () => dispatch(logOut()),
    loading: isFetching,
    error: error,
    loggedUser: currentUser,
    navigateTo,
    CheckAuth,
    handleLoginSubmit,
    registerFormInputs,
    handleRegisterSubmit,
    dispatch,
    isAuth,
    newUserRegister,
  };
};
