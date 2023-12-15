import React, { useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { MdDriveFolderUpload } from 'react-icons/md';
import { HomeLayout } from '../components';
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

  useEffect(() => {
    getMoviesGenres();

    if (inputRef.current) {
      inputRef.current.focus();
    }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;

            dispatch(
              registerUserData({
                image: e.target.files[0],
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
            dispatch(registerUserData({ image: undefined, deleteImage: true }))
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

  return (
    <HomeLayout>
      <div className="registerPageContainer animated fadeIn fast">
        <div className="registerPageWrapper">
          <h1>Formulario de registro de nuevo usuario</h1>

          <div className="registerPageForm animated fadeIn">
            <form
              onSubmit={handleRegisterSubmit}
              className="registerPageFormInner"
              autoComplete="off"
            >
              <div className="image_container">
                <img
                  src={
                    // newUserRegister.image
                    //   ? typeof newUserRegister.image === 'string'
                    //     ? newUserRegister.image
                    //     : URL.createObjectURL(newUserRegister.image)
                    //   : '/img/no-image.jpg'
                    '/img/no-image.jpg'
                  }
                  alt={
                    newUserRegister.image
                      ? 'Imágen de perfil de usuario.'
                      : 'No hay imágen de perfil para este usuario.'
                  }
                  style={{
                    // 'view-transition-name': 'image',
                    viewTransitionName: 'image',
                    // viewTransitionName: `${props.data._id ? props.data._id : ''}`,
                  }}
                  className='registerUserImage'
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
                    required
                  />
                  <label htmlFor="firstName" className="required">
                    Primer nombre
                  </label>
                </div>

                {registerFormInputs.map((input) => {
                  return input.select ? (
                    <div className="formField" key={input.id}>
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

              <button disabled={loadingMovies}>Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default register;
