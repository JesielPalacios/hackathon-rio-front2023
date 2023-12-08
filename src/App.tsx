import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Home, Login, Movies, NotFound, Register, Series } from './pages';

import { Loading } from './components';

import { useAuth } from './utils/hooks/useAuth';
import { useColorTheme } from './utils/hooks/useColorTheme';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { state } = useColorTheme();
  const { isAuth } = useAuth();

  return (
    <Suspense fallback={<Loading />}>
      <ToastContainer
        position="bottom-right"
        theme={state.theme === 'dark' ? 'dark' : 'light'}
        autoClose={2000}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="iniciar-sesion">
          <Route
            index
            element={!isAuth ? <Login /> : <Navigate replace to="/" />}
          />
          <Route path=":isAuth">
            <Route
              index
              element={!isAuth ? <Login /> : <Navigate replace to="/" />}
            />
          </Route>
        </Route>

        <Route path="registro">
          <Route
            index
            element={!isAuth ? <Register /> : <Navigate replace to="/" />}
          />
          <Route path=":isAuth">
            <Route
              index
              element={!isAuth ? <Register /> : <Navigate replace to="/" />}
            />
          </Route>
        </Route>

        <Route
          path="peliculas"
          element={
            isAuth ? <Movies /> : <Navigate replace to="/iniciar-sesion" />
          }
        />

        <Route
          path="series"
          element={
            isAuth ? <Series /> : <Navigate replace to="/iniciar-sesion" />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
