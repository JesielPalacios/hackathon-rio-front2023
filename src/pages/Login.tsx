import HomeLayout from '../components/hoc/HomeLayout';
import { useAuth } from '../utils/hooks/useAuth';
import './login.css';

const login = () => {
const { handleLoginSubmit } = useAuth();

  return (
    <HomeLayout>
      <div className="loginPageContainer animated fadeIn fast">
        <div className="loginPageWrapper">
          <h1 className="animated fadeIn fast">
            Formulario de inicio de sesión
          </h1>

          <div
            className="loginPageForm animated fadeIn"
            >
            <div className="loginPageFormInner">
              {/*  */}
              {/* <div className="formFieldsWrapper">
                <div className="formField">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Correo electrónico aquí"
                  />
                </div>
                <div className="formField">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="text"
                    name="password"
                    placeholder="Contraseña aquí"
                  />
                </div>
                </div>

              <button>Iniciar sesión</button> */}

              <div className="forms-wrap">
                <form
                onSubmit={handleLoginSubmit}
                  // action="index.html"
                  autoComplete="off"
                  className="sign-in-form"
                >
                  <div className="logo">
                    <img src="./img/logo.png" alt="easyclass" />
                    <h4>REYPELISTV</h4>
                  </div>

                  <div className="heading">
                    <h2>Bienvenido</h2>
                    <h6>¿Aún no estás registrado?</h6>{' '}
                    <a href="#" className="toggle">
                      Regístrate
                    </a>
                  </div>

                  <div className="actual-form">
                    <div className="input-wrap">
                      <input
                        type="email"
                        // minlength="4"
                        className="input-field"
                        autoComplete="off"
                        required
                        name="email"
                        // placeholder="Correo electrónico aquí"
                      />
                      <label htmlFor="email">Correo electrónico</label>
                    </div>

                    <div className="input-wrap">
                      <input
                        type="password"
                        // minlength="4"
                        className="input-field"
                        autoComplete="off"
                        required
                        name="password"
                        // placeholder="Contraseña aquí"
                      />
                      <label htmlFor="password">Contraseña</label>
                    </div>

                    <input
                      type="submit"
                      value="Iniciar sesión"
                      className="sign-btn"
                    />

                    <p className="text">
                      ¿Olvidó su contraseña o sus datos de inicio de sesión?
                      <a href="#"> Obtén ayuda </a> para iniciar sesión
                    </p>
                  </div>
                </form>

                <form
                  action="index.html"
                  autocomplete="off"
                  className="sign-up-form"
                >
                  <div className="logo">
                    <img src="./img/logo.png" alt="easyclass" />
                    <h4>easyclass</h4>
                  </div>

                  <div className="heading">
                    <h2>Get Started</h2>
                    <h6>Already have an account?</h6>
                    <a href="#" className="toggle">
                      Sign in
                    </a>
                  </div>

                  <div className="actual-form">
                    <div className="input-wrap">
                      <input
                        type="text"
                        minlength="4"
                        className="input-field"
                        autocomplete="off"
                        required
                      />
                      <label>Name</label>
                    </div>

                    <div className="input-wrap">
                      <input
                        type="email"
                        className="input-field"
                        autocomplete="off"
                        required
                      />
                      <label>Email</label>
                    </div>

                    <div className="input-wrap">
                      <input
                        type="password"
                        minlength="4"
                        className="input-field"
                        autocomplete="off"
                        required
                      />
                      <label>Password</label>
                    </div>

                    <input type="submit" value="Sign Up" className="sign-btn" />

                    <p className="text">
                      By signing up, I agree to the
                      <a href="#">Terms of Services</a> and
                      <a href="#">Privacy Policy</a>
                    </p>
                  </div>
                </form>
              </div>

              <div className="carousel">
                <div className="images-wrapper">
                  <img
                    src="./img/image1.png"
                    className="image img-1 show"
                    alt=""
                  />
                  <img src="./img/image2.png" className="image img-2" alt="" />
                  <img src="./img/image3.png" className="image img-3" alt="" />
                </div>

                <div className="text-slider">
                  <div className="text-wrap">
                    <div className="text-group">
                      <h2>Todas tus películas en un solo lugar</h2>
                      <h2>Excelente sistema de búsquedas</h2>
                      <h2>Alta calidad de video!</h2>
                    </div>
                  </div>

                  <div className="bullets">
                    <span className="active" data-value="1"></span>
                    <span data-value="2"></span>
                    <span data-value="3"></span>
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default login;
