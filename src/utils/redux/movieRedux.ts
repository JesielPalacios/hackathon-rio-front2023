import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    movie: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getAllMoviesStart: (state) => {
      state.isFetching = true;
    },
    getAllMoviesSuccess: (state, action) => {
      state.isFetching = false;
      state.movies = action.payload;
    },
    getAllMoviesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.movies = [];
    },
    getOneMovieStart: (state) => {
      state.isFetching = true;
    },
    getOneMovieSuccess: (state, action) => {
      state.isFetching = false;
      state.movie = action.payload;
    },
    getOneMovieFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.movie = null;
    },
  },
});

export const { getAllMoviesStart, getAllMoviesSuccess, getAllMoviesFailure } =
  movieSlice.actions;
export default movieSlice.reducer;
