import React from 'react';

const Home = React.lazy(() => import('./Home'));
const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));
const NotFound = React.lazy(() => import('./NotFound'));
const Movies = React.lazy(() => import('./Movies'));
const Series = React.lazy(() => import('./Series'));
const MyProfilePage = React.lazy(() => import('./MyProfilePage'));

export { Home, Login, Register, NotFound, Movies, Series, MyProfilePage };
