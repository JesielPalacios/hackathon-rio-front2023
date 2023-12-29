import React from 'react';
import { Navbar } from '..';
import useUIContext from '../../utils/hooks/useUIContext';
import ProfileOptions from '../modals/ProfileOptions';
import './publicLayout.css';
import { useColorTheme } from '../../utils/hooks/useColorTheme';
import SettingsModal from '../modals/SettingsModal';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { profileOptionsPopup, settingsModal, setSettingsModal } =
    useUIContext();

  const { state, dispatch } = useColorTheme();

  return (
    <div className="PublicLayout">
      <Navbar />

      {profileOptionsPopup && <ProfileOptions />}

      {children}

      {settingsModal && (
        <SettingsModal
          state={state}
          dispatch={dispatch}
          settingsModal={settingsModal}
          setSettingsModal={setSettingsModal}
        />
      )}
    </div>
  );
};

export default PublicLayout;
