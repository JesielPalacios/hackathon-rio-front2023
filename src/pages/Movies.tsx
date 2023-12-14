import { useEffect, useMemo, useState } from 'react';
import { DesktopSlider, HomeLayout } from '../components';
import { Movie } from '../types/types';
import { useMovie } from '../utils/hooks/useMovie';
import './movies.css';
import { movies } from '../utils/constants';
import config from '../utils/config/config';

const Movies = () => {
  // const { movies, getPopularMovies } = useMovie();
  console.log('movies', movies);

  useEffect(() => {
    // getPopularMovies();
  }, []);

  // const moviesImages = useMemo(() => movies.map((movie) => {
  // }), []);

  return (
    <HomeLayout>
      <div className="moviesPageContainer animated fadeIn fast">
        <div className="moviesPageContainerInner">
          <h1>Películas</h1>
          <div className="animated fadeIn ">
            {/* <div className="moviesContainer">
            {movies.map((movie) => {
              console.log('movie', movie);
              return (
                <div className="movieCard" key={movie.original_title}>
                  <h2>{movie.original_title}</h2>
                  <h3>{movie.release_date}</h3>
                  <img
                    src={config.imagePath+'/'+movie.poster_path}
                    alt={'image from movie ' + movie.original_title}
                  />
                  </div>
                  );
                })}
              </div> */}
            <div>
              <h2>De tu interés</h2>
              <DesktopSlider slides={movies} />
            </div>
            <div>
              <h2>Últimos estrenos</h2>
              <DesktopSlider slides={movies} />
            </div>{' '}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Movies;
