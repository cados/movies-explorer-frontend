import React from 'react';
import './MoviesCardList.css';
import { v4 as uuidv4 } from 'uuid';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <>
      {props.movies.length === 0
        ? <p className="movies-notfound">Ничего не найдено</p>
        : <ul className="movies__card-list">
          {props.movies.map(({ ...rest }) => (
            <MoviesCard
              key={uuidv4()}
              {...rest}
              onMovieLike={props.onMovieLike}
              onMovieDislike={props.onMovieDislike}
              onMovieDelete={props.onMovieDelete}
              isSaved={props.isSaved}
            />))}
        </ul>
      }
    </>
  );
}

export default MoviesCardList;
