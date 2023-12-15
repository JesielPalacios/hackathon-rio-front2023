import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    newUserRegister: {
      gender: 'Masculino',
    },
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //
    logOut: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
    },
    //
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.newUserRegister = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerUserGender: (state, action) => {
      state.newUserRegister = {
        ...state.newUserRegister,
        gender: action.payload,
      };
    },
    registerUserData: (state, action) => {
      state.newUserRegister = {
        ...state.newUserRegister,
        ...action.payload,
      };
    },
  
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  registerStart,
  registerSuccess,
  registerFailure,
  registerUserGender,
  registerUserData,
} = userSlice.actions;
export default userSlice.reducer;
