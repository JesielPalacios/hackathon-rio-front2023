import React, { createContext, useState } from 'react';

export const UIContext = createContext<any>(null);

export const UIContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileOptionsPopup, setProfileOptionsPopup] = useState(false);

  const toggleShowProfileOptionsPopup = () => setProfileOptionsPopup(!profileOptionsPopup);

  const [settingsModal, setSettingsModal] = useState(false);
  console.log('settingsModal', settingsModal)

  return (
    <UIContext.Provider
      value={{
        //
        profileOptionsPopup,
        setProfileOptionsPopup,
        toggleShowProfileOptionsPopup,
        //
        settingsModal,
        setSettingsModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
