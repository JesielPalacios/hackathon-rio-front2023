//@ts-nocheck
'use client';
import { createContext, useEffect, useReducer, useState } from 'react';

type StateType = {
  theme: string;
  fontSize: number;
  sidebar: boolean;
  navbarListPagination: boolean;
  // showSidebar: () => void;
};

// type ActionType = {
//   type: "CHANGE_THEME" | "CHANGE_FONTSIZE";
//   payload?: number;
// };

//Discriminated Unions
type ColorActionType = {
  type: 'CHANGE_THEME';
};
type SetColorActionType = {
  type: 'SET_THEME';
  payload: string;
};
type SizeActionType = {
  type: 'CHANGE_FONTSIZE';
  // payload: boolean;
  payload: number;
};
type SetSidebarActionType = {
  type: 'SET_SIDEBAR';
  payload: boolean;
};
type ToggleSidebarActionType = {
  type: 'TOGGLE_SIDEBAR';
};
type SetNavbarListNavigationActionType = {
  type: 'SET_NAVBBAR_LIST_NAVIGATION';
  payload: boolean;
};
type ToggleNavbarListNavigationActionType = {
  type: 'TOGGLE_NAVBBAR_LIST_NAVIGATION';
};

type ActionType =
  | ColorActionType
  | SetColorActionType
  | SizeActionType
  | SetSidebarActionType
  | ToggleSidebarActionType
  | SetNavbarListNavigationActionType
  | ToggleNavbarListNavigationActionType;

const INITIAL_STATE = {
  theme: 'dark',
  fontSize: 16,
  sidebar: false,
  navbarListPagination: true,
};

export type ColorThemeType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

export const ColorThemeContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      window.localStorage.colorMode = state.theme === 'dark' ? 'light' : 'dark';

      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };

    case 'SET_THEME':
      // window.localStorage.themme = action.payload ? 'dark' : 'light';
      window.localStorage.colorMode = action.payload;

      return {
        ...state,
        // theme: action.payload ? 'dark' : 'light',
        theme: action.payload,
      };

    case 'CHANGE_FONTSIZE':
      window.localStorage.fontSize = action.payload;

      return {
        ...state,
        fontSize: action.payload,
      };

    case 'SET_SIDEBAR':
      window.localStorage.sidebar = action.payload;

      return {
        ...state,
        sidebar: action.payload,
      };

    case 'TOGGLE_SIDEBAR':
      window.localStorage.sidebar = state.sidebar ? false : true;

      return {
        ...state,
        sidebar: state.sidebar ? false : true,
      };

    case 'SET_NAVBBAR_LIST_NAVIGATION':
      window.localStorage.navbarListPagination = action.payload;

      return {
        ...state,
        navbarListPagination: action.payload,
      };

    case 'TOGGLE_NAVBBAR_LIST_NAVIGATION':
      window.localStorage.navbarListPagination = state.navbarListPagination
        ? false
        : true;

      return {
        ...state,
        navbarListPagination: state.navbarListPagination ? false : true,
      };

    default:
      return state;
  }
};

export const ColorThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const colorModeFromLocalStorage = window.localStorage.getItem('colorMode');
  const isSystemPreferenceDark = window?.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  const systemPreference = isSystemPreferenceDark ? 'dark' : 'light';

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference
  );
  const [matchMedia, setMatchMedia] = useState(false);
  // const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('colorMode', state.theme);
    window.localStorage.fontSize = state.fontSize + '';

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: any) => {
      // window.localStorage.setItem('colorMode', event.matches);
      window.localStorage.setItem(
        'colorMode',
        event.matches ? 'dark' : 'light'
      );
      setMatchMedia(event.matches);

      if (event.matches) {
        setMode('dark');
      } else {
        setMode('light');
      }
    };

    // window.localStorage.setItem('colorMode', event.matches ? 'dark' : mode);
    mediaQuery.addListener(handleChange);

    window.localStorage.setItem(
      'colorMode',
      mode === 'dark' || mode === 'true' ? 'dark' : 'light'
    );

    // Set navbarListPagination
    // window.localStorage.navbarListPagination
    //   ? (window.localStorage.navbarListPagination = true + '')
    //   : '';
    window.localStorage.navbarListPagination
      ? window.localStorage.navbarListPagination === 'true'
      : '';

    dispatch({
      type: 'SET_NAVBBAR_LIST_NAVIGATION',
      payload: window.localStorage.navbarListPagination === 'true',
    });

    return () => mediaQuery.removeListener(handleChange);
  }, [mode, state.theme, state.fontSize]);
  // console.log(
  //   'window.localStorage.navbarListPagination',
  //   window.localStorage.navbarListPagination
  // );
  // console.log('state.navbarListPagination', state.navbarListPagination);

  return (
    <ColorThemeContext.Provider
      value={{
        state,
        dispatch,
        // sidebar,
        // showSidebar: () => setSidebar(!sidebar),
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
};
