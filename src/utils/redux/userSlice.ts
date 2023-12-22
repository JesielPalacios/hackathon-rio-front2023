import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    newUserRegister: {
      gender: 'Masculino',
      // preferences: [],
      email: 'jesielto14@gmail.com',
      firstName: 'John',
      firstSurname: 'Doe',
      // gender: 'Masculino',
      password: '1234567890',
      preferences: [
        {
          label: 'Action & Adventure',
          value: 'Action & Adventure',
          id: 10759,
        },
      ],
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

    registerUserSuccess: (state, action) => {
      state.isFetching = false;
      state.newUserRegister = action.payload;
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
    //
    loadingUsersRedux: (state) => {
      state.isFetching = true;
    },
    errorUsersRedux: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    resetLoadingandErrorUsersRedux: (state) => {
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  loadingUsersRedux,
  errorUsersRedux,
  registerUserSuccess,
  registerUserGender,
  registerUserData,
  resetLoadingandErrorUsersRedux,
} = userSlice.actions;
export default userSlice.reducer;
