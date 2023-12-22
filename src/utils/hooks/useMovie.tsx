import { toast } from 'react-toastify';
import {
  errorMoviesRedux,
  getMoviesGenresSucces,
  getPopularMoviesFailure,
  getPopularMoviesStart,
  getPopularMoviesSuccess,
  loadingMoviesRedux,
} from '../redux/movieRedux';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  getMoviesGenresService,
  getPopularMoviesService,
} from '../services/movies.service';

export const useMovie = () => {
  // const dispatch = useDispatch();
  // const { movies } = useSelector((state) => state.movie);

  // const movies = useSelector<RootState>(({ movie }) => movie.movies); //this works

  // const {movies} = useSelector<RootState>((state) => state.movie); //this doesn't works

  // The `state` arg is correctly typed as `RootState` already
  const { movies, moviesGenres, isFetching, error, movie } = useAppSelector(
    (state) => state.movie
  );
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

  function getMoviesGenres() {
    if (moviesGenres.length === 0) {
      dispatch(loadingMoviesRedux());

      getMoviesGenresService().then(async (response: any) => {
        const data = await response.json();

        if (response.status === 200) {
          dispatch(getMoviesGenresSucces(data.genres));
        } else {
          dispatch(errorMoviesRedux());

          data.message && toast.error(data.message);
          !data.message &&
            toast.error(
              'Ocurrió un error, inténtelo más tarde o comuníquese con nuestro equipo de soporte técnico.'
            );
        }
      });
    }
  }

  return {
    movies,
    movie,
    getPopularMovies,
    getMoviesGenres,
    moviesGenres,
    loadingMovies: isFetching,
    errorMovies: error,
  };
};
