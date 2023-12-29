import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../utils/hooks/useAuth';
import { logOut } from '../utils/redux/userSlice';
import { capitalizeFirstLetter } from '../utils/config/helpers';
import { useColorTheme } from '../utils/hooks/useColorTheme';
import useUIContext from '../utils/hooks/useUIContext';

const Navbar = () => {
  const { isAuth, logOut, loggedUser } = useAuth();
  const {
    //
    profileOptionsPopup,
    setProfileOptionsPopup,
    toggleShowProfileOptionsPopup,
    //
    settingsModal,
    setSettingsModal,
  } = useUIContext();

  return (
    <header className="homeNavbar">
      <Link to="/">
        <div className="logo">
          <img src="img/logo.png" alt="ReyPelisTV" />
        </div>
      </Link>

      {/* <form className="searchBox">
        <input type="text" placeholder="Buscar películas " />
      </form> */}

      <nav>
        {isAuth && <NavLink to="/peliculas">Películas</NavLink>}
        {isAuth && <NavLink to="/series">Series</NavLink>}

        {/* {isAuth && (
          <Link to="/" onClick={logOut}>
            Cerrar sesión
          </Link>
        )} */}

        {isAuth && (
          <div
            className="profileOptions"
            onClick={toggleShowProfileOptionsPopup}
          >
            <div className="spaceLine"></div>

            {capitalizeFirstLetter(
              loggedUser.firstName + ' ' + loggedUser.firstSurname
            )}

            <img
              src={
                loggedUser.image_secure_url
                  ? loggedUser.image_secure_url
                  : '/img/no-image.jpg'
              }
              alt="user picture profile"
            />
          </div>
        )}

        {!isAuth && <NavLink to="/iniciar-sesion">Iniciar sesión</NavLink>}
        {!isAuth && <NavLink to="/registro">Registrase</NavLink>}
      </nav>
    </header>
  );
};

export default Navbar;
