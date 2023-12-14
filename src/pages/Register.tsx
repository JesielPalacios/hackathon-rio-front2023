import React from 'react';
import { HomeLayout } from '../components';
import './register.css';
import { useAuth } from '../utils/hooks/useAuth';

const register = () => {
  const { registerFormInputs, handleRegisterSubmit, loading } = useAuth();

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
              <div className="formFieldsWrapper">
                {registerFormInputs.map((input) => (
                  <div className="formField" key={input.name}>
                    <input
                      id={input.name}
                      {...input.inputProps}
                      {...{ disabled: loading }}
                      autoComplete="off"
                    />
                    <label htmlFor={input.name} className={input.required}>
                      {input.label}
                    </label>
                  </div>
                ))}
                <div className="formField">
                  <div className="radio_container">
                    <div className="radio">
                      <label
                        htmlFor="Masculino"
                        // className={user.gender === 'Masculino' ? 'checked' : ''}
                      >
                        Masculino
                      </label>
                      <input
                        type="radio"
                        id="Masculino"
                        value="Masculino"
                        // checked={
                        //   // user.gender && user.gender ? user.gender === 'Masculino' : false
                        //   user.gender === 'Masculino'
                        // }
                        // {...disableEditing(loading)}
                      />
                    </div>

                    <div className="radio">
                      <label
                        htmlFor="Femenino"
                        // className={user.gender === 'Femenino' ? 'checked' : ''}
                      >
                        Femenino
                      </label>
                      <input
                        type="radio"
                        id="Femenino"
                        value="Femenino"
                        // checked={user.gender === 'Femenino'}
                        // {...disableEditing(loading)}
                      />
                    </div>
                  </div>
                  <label htmlFor="">Género</label>
                </div>
              </div>

              <button disabled={loading}>Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default register;
