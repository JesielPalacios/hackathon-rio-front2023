import React, { useContext } from 'react';
import { UIContext } from '../context/UIContext';

const useUIContext = () => {
  const {
    //
    profileOptionsPopup,
    setProfileOptionsPopup,
    toggleShowProfileOptionsPopup,
    //
    settingsModal,
    setSettingsModal,
  } = useContext(UIContext);

  return {
    //
    profileOptionsPopup,
    setProfileOptionsPopup,
    toggleShowProfileOptionsPopup,
    //
    settingsModal,
    setSettingsModal,
  };
};

export default useUIContext;
