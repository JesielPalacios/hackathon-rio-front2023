import React from 'react';
import { HomeLayout } from '../components';
import './register.css';

const register = () => {
  return (
    <HomeLayout>
      <div className="loginPageContainer animated fadeIn fast">
        <div className="loginPageWrapper">
          <h1>Formulario de registro</h1>
        </div>
      </div>
    </HomeLayout>
  );
};

export default register;
