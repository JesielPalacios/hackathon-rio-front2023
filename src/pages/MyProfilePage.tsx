import React, { useState } from 'react';
import { PublicLayout } from '../components';
import './myProfilePage.css';
import { useAuth } from '../utils/hooks/useAuth';
import { FiTrash2 } from 'react-icons/fi';
import { MdDriveFolderUpload } from 'react-icons/md';
import { registerUserData } from '../utils/redux/userSlice';

const MyProfilePage = () => {
  const { handleUpdateCurrentAuthImage, loading, dispatch, loggedUser } =
    useAuth();

  const [userImage, setUserImage] = useState<any>('hghchg');
  console.log('userImage', userImage)
  
  function handleDeleteUserImage() {
    
    setUserImage(null);
    console.log('userImage', userImage)
  }

  return (
    <PublicLayout>
      <div className="MyProfilePage">
        <div className="MyProfilePageContainer">
          <h1>Mi perfil</h1>

          <form
            className="MyProfilePageWrapper"
            onSubmit={handleUpdateCurrentAuthImage}
          >
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
                <div className="select_image_cell" role="button">
                  <label htmlFor="userPhoto">
                    Seleccionar {/* una */}
                    imágen: <MdDriveFolderUpload className="icon" />
                  </label>
                  <input
                    type="file"
                    name="userImageProfile"
                    id="userPhoto"
                    {...{ disabled: loading }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (!e.target.files) return;

                      // delete newUserRegister.deleteImage;

                      setUserImage(e.target.files[0]);
                    }}
                    style={{ display: 'none' }}
                  />
                </div>
                <button onClick={() => handleDeleteUserImage}>Eliminar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
};

export default MyProfilePage;
