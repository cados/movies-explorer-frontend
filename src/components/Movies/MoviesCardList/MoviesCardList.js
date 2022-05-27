import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onMovieLike, onMovieDislike, onMovieDelete, isSaved }) {
  return (
    <>
      {movies.length === 0
        ? <p className="movies-notfound">Ничего не найдено</p>
        : (
          <ul className="movies__card-list">
            {movies.map((movie) => (
              <MoviesCard
                key={movie.movieId}
                data={movie}
                onMovieLike={onMovieLike}
                onMovieDislike={onMovieDislike}
                onMovieDelete={onMovieDelete}
                isSaved={isSaved}
              />
            ))}
          </ul>
        )}
    </>
  );
}

export default MoviesCardList;
