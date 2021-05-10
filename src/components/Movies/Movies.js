import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  return (
    <section className="movies">
      <SearchForm
        title="Фильмы"
        // search={searchFilter}
      />
      {/* <MoviesCardList
        movieList={currentMovieList}
        component={MoviesCard}
      /> */}
    </section>
  );
}

export default Movies;
