import React from 'react';
import { PublicLayout } from '../components';
import './myProfilePage.css';
import { useAuth } from '../utils/hooks/useAuth';

const MyProfilePage = () => {
  const { loggedUser } = useAuth();
  return (
    <PublicLayout>
      <div className="MyProfilePage">
        <div className="MyProfilePageContainer">
          <h1>Mi perfil</h1>

          <form className="MyProfilePageWrapper">
            <div
              className="MyProfilePageFormImageContainer"
              title="Foto de perfil"
            >
              <img
                src={
                  loggedUser.image_secure_url
                    ? loggedUser.image_secure_url
                    : '/img/no-image.jpg'
                }
                alt="user picture profile"
              />

              {/* <!-- Div de superposición --> */}
              <div className="MyProfilePageFormImageButtons">
                <form>
                 <section>
                   <div>
                     <button>Seleccionar imágen</button>
                     <button>Eliminar</button>
                   </div>
                 </section>
                </form>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
};

export default MyProfilePage;
