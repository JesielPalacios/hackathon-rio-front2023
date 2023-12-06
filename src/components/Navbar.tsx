import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../utils/hooks/useAuth';

const Navbar = () => {
  const { loggedUser } = useAuth();

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
        <NavLink to="/peliculas">Películas</NavLink>
        <NavLink to="/series">Series</NavLink>
        {loggedUser.accessToken && <Link to="/">Cerrar sesión</Link>}
        {!loggedUser.accessToken && (
          <NavLink to="/iniciar-sesion">Iniciar sesión</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
