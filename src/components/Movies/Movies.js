import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from './MoviesCard/MoviesCard';
// import movieList from '../../utils/Movies.json';
// import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <section className="movies">
      <SearchForm
        // title="Фильмы"
        // search={searchFilter}
      />
        <MoviesCard />
    </section>
  );
}

export default Movies;
