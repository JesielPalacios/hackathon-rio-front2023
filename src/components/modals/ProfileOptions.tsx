import { useEffect, useRef } from 'react';
import { useAuth } from '../../utils/hooks/useAuth';
import useUIContext from '../../utils/hooks/useUIContext';
import './profileOptionsPopup.css';

const ProfileOptions = () => {
  const {
    profileOptionsPopup,
    setProfileOptionsPopup,
    toggleShowProfileOptionsPopup,
    //
    setSettingsModal,
  } = useUIContext();

  const { logOut, navigateTo } = useAuth();

  let profileOptionsRef = useRef<HTMLDivElement>(null);

  // console.log('profileOptionsRef', profileOptionsRef);

  const toggleValue = (value: boolean, _function: (value: boolean) => void) =>
    _function(!value);

  // // Escuchar eventos de clic en cualquier parte de la página para cerrar el modal
  // useEffect(() => {
  //   const handleOutsideClickProfileOptions = (e: MouseEvent) => {
  //     if (
  //       (profileOptionsPopup && !e.target) ||
  //       // !(e.target as Element).closest('#profileOptionsRef')
  //       // !(e.target as Element).closest(profileOptionsRef.current.className)
  //       !(e.target as Element).closest('.profileOptionsPopup')
  //     ) {
  //       setProfileOptionsPopup(false);
  //     }
  //   };
  //   // Agregar el evento de clic al documento cuando el modal está abierto
  //   if (profileOptionsPopup) {
  //     document.addEventListener('click', handleOutsideClickProfileOptions);
  //   }
  //   // Limpiar el evento cuando el componente se desmonta o el modal se cierra
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClickProfileOptions);
  //   };
  // }, [profileOptionsPopup]);

  //
  //
  //
  //
  //
  //
  //
  //
  const handleCloseModal = (event: MouseEvent) => {
    // Verificar si el clic se realizó fuera del modal
    if (
      profileOptionsRef.current &&
      !profileOptionsRef.current.contains(event.target as Node)
    ) {
      setProfileOptionsPopup(false);
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      // Cerrar el modal al presionar la tecla Escape
      if (event.key === 'Escape') {
        setProfileOptionsPopup(false);
      }
    };

    // Adjuntar un manejador de clic al documento cuando el modal está abierto
    // Adjuntar manejadores de clic y teclado cuando el modal está abierto
    if (profileOptionsPopup) {
      // document.addEventListener('click', handleCloseModal);
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Eliminar el manejador de clic cuando el componente se desmonta o el modal se cierra
    // Eliminar los manejadores cuando el componente se desmonta o el modal se cierra
    return () => {
      // document.removeEventListener('click', handleCloseModal);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [profileOptionsPopup, setProfileOptionsPopup]);

  return (
    <div
      className={`profileOptionsPopup ${profileOptionsPopup ? 'active' : ''}`}
      ref={profileOptionsRef}
      id="profileOptionsRef"
    >
      <button
        onClick={() => {
          navigateTo('/mi-perfil');
          setProfileOptionsPopup(false);
        }}
      >
        Mi perfil
      </button>
      <button
        onClick={() => {
          setSettingsModal(true);

          // toggleValue(settingsModal, setSettingsModal);

          toggleShowProfileOptionsPopup();
        }}
      >
        Configuraciones
      </button>
      <hr />
      <button
        onClick={() => {
          setProfileOptionsPopup(false);
          logOut();
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default ProfileOptions;
