import { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Loading } from './components';
import { Home, Login, NotFound, Register } from './pages';
import { useAuth } from './utils/hooks/useAuth';

function App() {
  const { loggedUser } = useAuth();
  const isAuth = loggedUser.accessToken;

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="iniciar-sesion">
            <Route
              index
              element={!isAuth ? <Login /> : <Navigate replace to="/" />}
            />
            <Route path=":token">
              <Route
                index
                element={!isAuth ? <Login /> : <Navigate replace to="/" />}
              />
            </Route>
          </Route>

          <Route path="register">
            <Route
              index
              element={!isAuth ? <Register /> : <Navigate replace to="/" />}
            />
            <Route path=":token">
              <Route
                index
                element={!isAuth ? <Register /> : <Navigate replace to="/" />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
