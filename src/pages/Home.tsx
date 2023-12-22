import { PublicLayout } from '../components';
import { useAuth } from '../utils/hooks/useAuth';
import './home.css';

const home = () => {
  const { loggedUser } = useAuth();

  return (
    <PublicLayout>
      <div className="homePageContainer animated fadeIn fast">
        <div className="homePageContainerInner">
          <h1>Página principal</h1>

          {loggedUser && (
            <h2>
              {loggedUser.gender === 'Femenino'
                ? `Bienvenida ${loggedUser.email}`
                : `Bienvenido ${loggedUser.email}`}
            </h2>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default home;
