import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/types';

// Define a type for the slice state
interface MovieState {
  movies: Movie[];
  movie: Movie | null;
  isFetching: boolean;
  error: boolean;
}

// Define the initial state using that type
// const initialState = {
const initialState: MovieState = {
  movies: [],
  movie: null,
  isFetching: false,
  error: false,
};
// } as MovieState

const movieSlice = createSlice({
  name: 'movie',
  // `movieSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getPopularMoviesStart: (state) => {
      state.isFetching = true;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    getPopularMoviesSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.isFetching = false;
      state.movies = action.payload;
    },
    getPopularMoviesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.movies = [];
    },

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

export const {
  getAllMoviesStart,
  getAllMoviesSuccess,
  getAllMoviesFailure,

  getPopularMoviesStart,
  getPopularMoviesSuccess,
  getPopularMoviesFailure,
} = movieSlice.actions;
export default movieSlice.reducer;
