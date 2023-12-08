import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../utils/hooks/useAuth';
import { logOut } from '../utils/redux/userSlice';

const Navbar = () => {
  const { isAuth, logOut } = useAuth();

  return (
    <header className="homeNavbar">
      <Link to="/">
        <div className="logo">
          <img src="img/logo.png" alt="ReyPelisTV" />
        </div>
      </Link>

      <form className="searchBox">
        <input type="text" placeholder="Buscar películas " />
      </form>

      <nav>
        {isAuth && <NavLink to="/peliculas">Películas</NavLink>}
        {isAuth && <NavLink to="/series">Series</NavLink>}
        {isAuth && (
          <Link to="/" onClick={logOut}>
            Cerrar sesión
          </Link>
        )}
        {!isAuth && <NavLink to="/iniciar-sesion">Iniciar sesión</NavLink>}
        {!isAuth && <NavLink to="/registro">Registrase</NavLink>}
      </nav>
    </header>
  );
};

export default Navbar;
