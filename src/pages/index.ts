import React from 'react';

const Home = React.lazy(() => import('./Home'));
const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));
const NotFound = React.lazy(() => import('./NotFound'));

export { Home, Login, Register, NotFound };
