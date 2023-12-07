import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import AuthContext from './utils/context/AuthContext.tsx';
import { persistor, store } from './utils/redux/store/index.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading="null" persistor={persistor}>
        <Router>
          <AuthContext.Provider>
            <App />
          </AuthContext.Provider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
