import React, { useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { MdDriveFolderUpload } from 'react-icons/md';
import { PublicLayout } from '../components';
import { useAuth } from '../utils/hooks/useAuth';
import { useMovie } from '../utils/hooks/useMovie';
import { registerUserData, registerUserGender } from '../utils/redux/userSlice';

import './register.css';

const register = () => {
  const {
    registerFormInputs,
    handleRegisterSubmit,
    loading,
    dispatch,
    newUserRegister,
  } = useAuth();

  const { getMoviesGenres, loadingMovies } = useMovie();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onUnload = (e: BeforeUnloadEvent) => {
    // the method that will be used for both add and remove event
    e.preventDefault();
    e.returnValue =
      'Formulario incompleto: Tus datos no se perderán en este navegador cuando vuelvas al registro.';
  };
  useEffect(() => {
    getMoviesGenres();

    if (inputRef.current) {
      inputRef.current.focus();
    }

    // window.onbeforeunload = function (eBeforeUnloadEvent) {
    //   return 'Please make sure, the video has finished uploading before closing this window.';
    // };

    window.addEventListener('beforeunload', onUnload);

    return () => window.removeEventListener('beforeunload', onUnload);
  }, []);

  const imageFieldForm = (
    <div className="select_image">
      <div className="select_image_cell">
        <label htmlFor="userPhoto">
          Seleccionar {/* una */}
          imágen: <MdDriveFolderUpload className="icon" />
        </label>
        <input
          type="file"
          id="userPhoto"
          {...{ disabled: loadingMovies }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;

            // delete newUserRegister.deleteImage;

            dispatch(
              registerUserData({
                ...newUserRegister,
                image: e.target.files[0],
                // deleteImage: false,
              })
            );
          }}
          style={{ display: 'none' }}
        />
      </div>

      {newUserRegister.image && (
        <div
          className="select_image_cell"
          onClick={() =>
            dispatch(
              registerUserData({
                image: undefined,
                //  deleteImage: true
              })
            )
          }
        >
          <label htmlFor="userPhoto">
            {/* Borrar imágen: */}
            <FiTrash2 className="icon" />
            {/* <FcRemoveImage className="icon" /> */}
          </label>
        </div>
      )}
    </div>
  );

  function renderNewUserImage() {
    try {
      return newUserRegister.image
        ? typeof newUserRegister.image === 'string'
          ? newUserRegister.image
          : URL.createObjectURL(newUserRegister.image)
        : '/img/no-image.jpg';
    } catch (err) {
      // console.log('err', err);
      dispatch(
        registerUserData({
          image: undefined,
          //  deleteImage: true
        })
      );
      return '/img/no-image.jpg';
    }
  }

  return (
    <PublicLayout>
      <div className="registerPageContainer animated fadeIn fast">
        <div className="registerPageWrapper">
          <h1>Formulario de registro de nuevo usuario</h1>

          <hr />

          <form
            onSubmit={handleRegisterSubmit}
            autoComplete="off"
            className="registerPageForm animated fadeIn"
            id="register_client_form"
          >
            <div className="registerPageFormInner">
              <div className="image_container">
                <img
                  src={renderNewUserImage()}
                  alt={
                    newUserRegister.image
                      ? 'Imágen de perfil para el nuevo usuario.'
                      : 'No se ha seleccionado ninguna imágen.'
                  }
                  style={{
                    // 'view-transition-name': 'image',
                    viewTransitionName: 'image',
                    // viewTransitionName: `${props.data._id ? props.data._id : ''}`,
                  }}
                  className="registerUserImage"
                />

                {/* {console.log('props.data._id', props.data._id)} */}
                {imageFieldForm}
              </div>

              <div className="formFieldsWrapper">
                <div className="formField">
                  <input
                    ref={inputRef}
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="off"
                    placeholder="Primer nombre aquí."
                    // required
                    defaultValue={newUserRegister[`firstName`]}
                    {...{ disabled: loadingMovies }}
                  />
                  <label htmlFor="firstName" className="required">
                    Primer nombre
                  </label>
                </div>

                {registerFormInputs.map((input) => {
                  return input.select ? (
                    <div className={'formField ' + input.id} key={input.id}>
                      {input.element}
                      <label htmlFor={input.id} className={'input.required'}>
                        {input.label}
                      </label>
                    </div>
                  ) : (
                    <div className="formField" key={input.name}>
                      <input
                        id={input.name}
                        {...input.inputProps}
                        {...{ disabled: loadingMovies }}
                        defaultValue={input.value}
                        autoComplete="off"
                      />
                      <label htmlFor={input.name} className={'input.required'}>
                        {input.label}
                      </label>
                    </div>
                  );
                })}

                <div className="formField">
                  <div className="radio_container">
                    <div className="radio">
                      <label
                        htmlFor="Masculino"
                        className={
                          newUserRegister?.gender === 'Masculino'
                            ? 'checked'
                            : ''
                        }
                      >
                        Masculino
                      </label>
                      <input
                        type="radio"
                        id="Masculino"
                        value="Masculino"
                        checked={newUserRegister?.gender === 'Masculino'}
                        onChange={(e) =>
                          dispatch(registerUserGender(e.target.value))
                        }
                        // {...disableEditing(loading)}
                      />
                    </div>

                    <div className="radio">
                      <label
                        htmlFor="Femenino"
                        className={
                          newUserRegister?.gender === 'Femenino'
                            ? 'checked'
                            : ''
                        }
                      >
                        Femenino
                      </label>
                      <input
                        type="radio"
                        id="Femenino"
                        value="Femenino"
                        checked={newUserRegister?.gender === 'Femenino'}
                        onChange={(e) =>
                          dispatch(registerUserGender(e.target.value))
                        }
                        // {...disableEditing(loading)}
                      />
                    </div>
                  </div>
                  <label htmlFor="Femenino">Género</label>
                </div>
              </div>
            </div>
            <button disabled={loadingMovies}>Iniciar sesión</button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
};

export default register;
