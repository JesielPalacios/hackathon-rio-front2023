import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularMoviesService } from '../services/movies.service';
import {
  getPopularMoviesFailure,
  getPopularMoviesStart,
  getPopularMoviesSuccess,
} from '../redux/movieRedux';
import { toast } from 'react-toastify';
import { RootState, useAppDispatch, useAppSelector } from '../redux/store';

export const useMovie = () => {
  // const dispatch = useDispatch();
  // const { movies } = useSelector((state) => state.movie);

  // const movies = useSelector<RootState>(({ movie }) => movie.movies); //this works

  // const {movies} = useSelector<RootState>((state) => state.movie); //this doesn't works

  // The `state` arg is correctly typed as `RootState` already
  const movies = useAppSelector((state) => state.movie.movies);
  const dispatch = useAppDispatch();

  function getPopularMovies() {
    dispatch(getPopularMoviesStart());

    getPopularMoviesService().then(async (response: any) => {
      const data = await response.json();

      if (response.status === 200) {
        dispatch(getPopularMoviesSuccess(data.results));
      } else {
        dispatch(getPopularMoviesFailure());

        data.message && toast.error(data.message);
        !data.message &&
          toast.error(
            'Ocurrió un error, inténtelo más tarde o comuníquese con nuestro equipo de soporte técnico.'
          );
      }
    });
  }

  return { movies, getPopularMovies };
};
