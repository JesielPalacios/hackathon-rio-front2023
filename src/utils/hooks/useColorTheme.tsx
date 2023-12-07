'use client';
import { useContext,  useState } from 'react';
import { ColorThemeContext } from '../context/ColorThemeContext';

export const useColorTheme = () => {
  // const { setColorMode, mode, matchMedia } = useContext(ColorThemeContext);
  const { state, dispatch } = useContext(ColorThemeContext);

  const [profileOptionsPopup, setProfileOptionsPopup] = useState(false);
  const toggleShowProfileOptionsPopup = () =>
    setProfileOptionsPopup(!profileOptionsPopup);

  const [settingsModal, setSettingsModal] = useState(false);

  // useEffect(() => {
  //   // Set navbarListPagination
  //   // !window.localStorage.navbarListPagination
  //   //   ? (window.localStorage.navbarListPagination = true + '')
  //   //   : '';

  //   window.localStorage.navbarListPagination &&
  //     dispatch({
  //       type: 'TOGGLE_NAVBBAR_LIST_NAVIGATION',
  //       payload: window.localStorage.navbarListPagination === 'true',
  //     });
  // }, [state.navbarListPagination]);

  return {
    state,
    dispatch,
    //
    profileOptionsPopup,
    setProfileOptionsPopup,
    toggleShowProfileOptionsPopup,
    //
    settingsModal,
    setSettingsModal,
  };
};
