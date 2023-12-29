import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSave, AiOutlineClose } from 'react-icons/ai';
// import { useColorTheme } from '@/core/hooks/useColorTheme';
import './settingsModal.css';

const SettingsModal = (props: any) => {
  // console.clear();
  const [temporalFontSize, setTemporalFontSize] = useState(16);
  // console.log('temporalFontSize', temporalFontSize);
  const [temporalColorTheme, setTemporalColorTheme] = useState('light');
  // console.log('temporalColorTheme', temporalColorTheme);
  const [temporalNavbarListPagination, setTemporalNavbarListPagination] =
    useState(false);
  // console.log('temporalNavbarListPagination', temporalNavbarListPagination);

  // const { state, dispatch, settingsModal, setSettingsModal } = useColorTheme();

  useEffect(() => {
    setTemporalFontSize(props.state.fontSize);
    setTemporalColorTheme(props.state.theme);
    setTemporalNavbarListPagination(props.state.navbarListPagination);
  }, []);

  function handleSettingsForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // props.state.fontSize != temporalFontSize &&
    props.dispatch({ type: 'CHANGE_FONTSIZE', payload: temporalFontSize });

    // props.state.theme != temporalColorTheme &&
    props.dispatch({ type: 'SET_THEME', payload: temporalColorTheme });

    // props.state.navbarListPagination != temporalNavbarListPagination &&
    props.dispatch({
      type: 'TOGGLE_NAVBBAR_LIST_NAVIGATION',
      payload: temporalNavbarListPagination,
    });

    props.setSettingsModal(false);
  }

  // Escuchar eventos de clic en cualquier parte de la página para cerrar el modal
  useEffect(() => {
    const handleOutsideClickSettingsModal = (e: MouseEvent) => {
      if (
        (props.settingsModal && !e.target) ||
        !(e.target as Element).closest('.settingsModalInner')
      ) {
        props.setSettingsModal(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      // Cerrar el modal al presionar la tecla Escape
      if (event.key === 'Escape') {
        props.setSettingsModal(false);
      }
    };

    // Agregar el evento de clic al documento cuando el modal está abierto
    if (props.settingsModal) {
      // document.addEventListener('click', handleOutsideClickSettingsModal);
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Limpiar el evento cuando el componente se desmonta o el modal se cierra
    return () => {
      // document.removeEventListener('click', handleOutsideClickSettingsModal);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [props.settingsModal]);

  return (
    // <ProfileOptionsContainer
    // className={`${settingsModal ? styles.active : ''}`}
    // >
    <div className={`settingsModal ${props.settingsModal ? 'active' : ''}`}>
      <div className="settingsModalContent">
        <div className="settingsModalInner">
          {/* <button className="settingModalCloseIcon"> */}
          <AiOutlineClose
            className="settingModalCloseIcon"
            onClick={() => {
              // showProfileOptions();
              // toggleValue(settingsModal, setSettingsModal);
              props.setSettingsModal(false);
            }}
          />
          {/* </button> */}
          <form onSubmit={handleSettingsForm} className="settingsModalForm">
            <fieldset>
              <legend>Diseño:</legend>
              <div className="settingsField">
                <label className="checkboxContainer">
                  Mantener la barra de navegación de las listas por fuera.
                  <input
                    type="checkbox"
                    checked={temporalNavbarListPagination}
                    value={temporalNavbarListPagination + ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTemporalNavbarListPagination((prev) => {
                        // window.localStorage.navbarListPagination =
                        //   e.target.value === 'true' ? false : true;
                        return e.target.value === 'true' ? false : true;
                      })
                    }
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Tema de color:</legend>
              <div className="settingsField">
                <label className="checkboxContainer">
                  Activar modo oscuro:
                  {/* <ThemeToggle />{' '} */}
                  <input
                    type="checkbox"
                    // checked="checked"
                    checked={temporalColorTheme === 'dark'}
                    value={temporalColorTheme}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTemporalColorTheme(
                        e.target.value === 'light' ? 'dark' : 'light'
                      )
                    }
                  />
                  <span className="checkmark"></span>
                </label>
              </div>{' '}
            </fieldset>

            <fieldset>
              <legend>Accesibilidad:</legend>
              <div className="settingsField">
                <div className="settingsContent">
                  Tamaño de la fuente:
                  <input
                    type="number"
                    defaultValue={temporalFontSize}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTemporalFontSize(Number(e.target.value))
                    }
                  />
                </div>
              </div>{' '}
            </fieldset>

            <button>
              Guardar <AiOutlineSave className="settingModalSaveIcon" />
            </button>
          </form>
        </div>
      </div>
    </div>
    // </ProfileOptionsContainer>
  );
};

// const ProfileOptionsContainer = styled.div`
//   position: absolute;
//   right: 20px;
//   /* top: 5px; */
//   z-index: 999;
//   /* padding-right: 20px; */
//   margin-top: 5px;
//   display: flex;
//   gap: 5px;
//   flex-direction: column;
//   background-color: var(--main-bg-color);
//   border: 1px solid #bbb;
//   padding: 20px;
//   border-radius: var(--br);
//   align-items: flex-start;
//   opacity: 0;

//   -webkit-animation-name: growIn;
//   animation-name: growIn;
//   -webkit-animation-duration: 0.2s;
//   animation-duration: 0.2s;
//   -webkit-animation-timing-function: transform cubic-bezier(0.18, 1.25, 0.4, 1),
//     opacity cubic-bezier(0, 1, 0.4, 1);
//   animation-timing-function: transform cubic-bezier(0.18, 1.25, 0.4, 1),
//     opacity cubic-bezier(0, 1, 0.4, 1);

//   box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
// `;

export default SettingsModal;
