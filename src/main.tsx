import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import { persistor, store } from './utils/redux/store/index.ts';
import './index.css';
import AuthContext from './utils/context/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading="null" persistor={persistor}>
        <AuthContext.Provider>
          <App />
        </AuthContext.Provider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
